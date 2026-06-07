import { describe, expect, it } from "vitest";
import { JSDOM } from "jsdom";
import type { QuartzComponentProps } from "@quartz-community/types";

// We test the component's rendering logic by simulating what the constructor produces.
// The inline script runs in the browser, so we test its contract (data attributes)
// rather than its runtime behavior.

function createProps(
  pageTitle?: string,
  displayClass?: "mobile-only" | "desktop-only",
): QuartzComponentProps {
  return {
    cfg: { pageTitle, locale: "en-US" } as QuartzComponentProps["cfg"],
    displayClass,
    fileData: {} as QuartzComponentProps["fileData"],
    externalResources: { css: [], js: [], additionalHead: [] },
    children: [],
    tree: { type: "root", children: [] } as QuartzComponentProps["tree"],
    allFiles: [],
    ctx: {
      argv: {
        directory: "content",
        verbose: false,
        output: "dist",
        serve: false,
        watch: false,
        port: 0,
        wsPort: 0,
      },
      cfg: {},
      buildId: "test",
      allSlugs: [],
      allFiles: [],
      incremental: false,
    } as QuartzComponentProps["ctx"],
  };
}

async function renderComponent(
  opts?: Parameters<typeof import("../src/components/TypewriterTitle").default>[0],
  pageTitle?: string,
  displayClass?: "mobile-only" | "desktop-only",
): Promise<JSDOM> {
  const { default: TypewriterTitle } = await import("../src/components/TypewriterTitle");
  const Component = TypewriterTitle(opts);
  const props = createProps(pageTitle, displayClass);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsx = Component(props) as any;
  const { render } = await import("preact-render-to-string");
  const html = render(jsx);

  return new JSDOM(html);
}

describe("TypewriterTitle component contract", () => {
  it("renders with default data attributes", async () => {
    const dom = await renderComponent(undefined, "My Digital Garden");
    const el = dom.window.document.getElementById("typewriter-title");

    expect(el).not.toBeNull();
    expect(el?.getAttribute("data-title")).toBe("My Digital Garden");
    expect(el?.getAttribute("data-speed")).toBe("85");
    expect(el?.getAttribute("data-keep-blinking")).toBe("false");
    expect(el?.getAttribute("data-blink-speed")).toBe("650");
    expect(el?.getAttribute("data-animate-only-on-home")).toBe("true");
    expect(el?.getAttribute("aria-label")).toBe("My Digital Garden");
  });

  it("renders with custom options", async () => {
    const dom = await renderComponent(
      {
        typingSpeed: 50,
        keepBlinking: true,
        blinkSpeed: 1500,
        animateOnlyOnHome: false,
      },
      "My Digital Garden",
    );
    const el = dom.window.document.getElementById("typewriter-title");

    expect(el?.getAttribute("data-speed")).toBe("50");
    expect(el?.getAttribute("data-keep-blinking")).toBe("true");
    expect(el?.getAttribute("data-blink-speed")).toBe("1500");
    expect(el?.getAttribute("data-animate-only-on-home")).toBe("false");
  });

  it("includes noscript fallback with title", async () => {
    const dom = await renderComponent(undefined, "Fallback Title");
    const noscript = dom.window.document.querySelector("noscript");

    expect(noscript?.textContent).toBe("Fallback Title");
  });

  it("wraps in page-title h2 with displayClass", async () => {
    const dom = await renderComponent(undefined, "Test", "desktop-only");
    const wrapper = dom.window.document.querySelector("h2.page-title");

    expect(wrapper).not.toBeNull();
    expect(wrapper?.classList.contains("desktop-only")).toBe(true);
  });

  it("attaches CSS and afterDOMLoaded resources", async () => {
    const { default: TypewriterTitle } = await import("../src/components/TypewriterTitle");
    const Component = TypewriterTitle();

    expect(Component.css).toBeDefined();
    expect(typeof Component.css).toBe("string");
    expect(Component.afterDOMLoaded).toBeDefined();
    expect(typeof Component.afterDOMLoaded).toBe("string");
  });

  it("falls back to Untitled when pageTitle is missing", async () => {
    const dom = await renderComponent(undefined, undefined);
    const el = dom.window.document.getElementById("typewriter-title");

    expect(el?.getAttribute("data-title")).toBe("Untitled");
  });
});
