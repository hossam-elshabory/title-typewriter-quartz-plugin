import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { classNames } from "../util/lang";
import style from "./styles/typewriter.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./scripts/typewriter.inline.ts";

export interface TypewriterTitleOptions {
  /** Milliseconds per character during typing animation. Lower is faster. */
  typingSpeed?: number;
  /** Whether the cursor keeps blinking indefinitely after typing finishes. */
  keepBlinking?: boolean;
  /** Speed of the blink cycle in milliseconds. */
  blinkSpeed?: number;
  /** Only play the typing animation on the home page. When false, typing plays on the first page visited. */
  animateOnlyOnHome?: boolean;
}

const defaultOptions: Required<TypewriterTitleOptions> = {
  typingSpeed: 85,
  keepBlinking: false,
  blinkSpeed: 650,
  animateOnlyOnHome: true,
};

export default ((userOpts?: TypewriterTitleOptions) => {
  const opts = { ...defaultOptions, ...userOpts };

  const Component: QuartzComponent = ({ cfg, displayClass }: QuartzComponentProps) => {
    const title = cfg?.pageTitle ?? "Untitled";

    return (
      <h2 class={classNames(displayClass, "page-title")}>
        <a
          href="/"
          id="typewriter-title"
          aria-label={title}
          data-title={title}
          data-speed={opts.typingSpeed}
          data-keep-blinking={String(opts.keepBlinking)}
          data-blink-speed={opts.blinkSpeed}
          data-animate-only-on-home={String(opts.animateOnlyOnHome)}
        >
          <noscript>{title}</noscript>
        </a>
      </h2>
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor<TypewriterTitleOptions>;
