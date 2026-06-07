/* eslint-disable no-restricted-syntax --
   Persistent nav/prenav listeners are intentionally never removed — they must
   fire on every SPA navigation cycle. Timer cleanup is handled in the prenav
   handler and via window._typewriterState management. */

// ============================================================================
// TypewriterTitle Inline Script
// ============================================================================
// Bundled as a string and injected via Component.afterDOMLoaded.
// Runs in the browser — handles SPA lifecycle via nav/prenav events.
// All browser API access is guarded for Node.js test environments.
// ============================================================================

interface TypewriterState {
  initialRan: boolean;
  loopActive: boolean;
  loopTimer: ReturnType<typeof setTimeout> | null;
  sweepTimer: ReturnType<typeof setTimeout> | null;
  finished: boolean;
}

/** Lazy accessor for persistent state — initializes on first call in the browser. */
function getState(): TypewriterState {
  const _win = window as unknown as { _typewriterState?: TypewriterState };
  if (!_win._typewriterState) {
    _win._typewriterState = {
      initialRan: false,
      loopActive: false,
      loopTimer: null,
      sweepTimer: null,
      finished: false,
    };
  }
  return _win._typewriterState;
}

/** Use DocumentFragment for zero-layout-shift DOM insertion. */
function buildSpans(el: HTMLElement, title: string) {
  el.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < title.length; i++) {
    const span = document.createElement("span");
    span.textContent = title[i] ?? null;
    span.className = "glass-letter";
    span.style.setProperty("--delay", i * 0.04 + "s");
    span.setAttribute("aria-hidden", "true");
    fragment.appendChild(span);
  }
  el.appendChild(fragment);
}

// Guard all browser API access for Node.js environments (vitest, SSR)
if (typeof window !== "undefined") {
  document.addEventListener("nav", () => {
    const state = getState();
    const rawEl = document.getElementById("typewriter-title");
    if (!rawEl) return;
    // Capture the narrowed reference so closures retain the non-null type
    const titleEl: HTMLElement = rawEl;

    const title = titleEl.getAttribute("data-title") || "";
    const keepBlinking = titleEl.getAttribute("data-keep-blinking") === "true";
    const blinkSpeed = titleEl.getAttribute("data-blink-speed") || "650";
    const animateOnlyOnHomeAttr = titleEl.getAttribute("data-animate-only-on-home");
    const animateOnlyOnHome = animateOnlyOnHomeAttr !== "false"; // default true

    titleEl.style.setProperty("--blink-speed", blinkSpeed + "ms");

    // Check if this is the home page
    const isHome = window.location.pathname === "/" || document.body.dataset.slug === "index";

    // Always build the spans for display on all pages
    buildSpans(titleEl, title);

    // Determine if typing animation should play on this page
    const shouldTypeOnThisPage = animateOnlyOnHome ? isHome : true;

    if (shouldTypeOnThisPage && !state.initialRan) {
      state.initialRan = true;
      state.loopActive = false;

      // Clear and start typing animation
      titleEl.textContent = "";
      titleEl.classList.add("typing");

      let idx = 0;
      const type = (): void => {
        if (idx < title.length) {
          idx++;
          titleEl.textContent = title.substring(0, idx);
          setTimeout(type, parseInt(titleEl.getAttribute("data-speed") || "85"));
        } else {
          state.finished = true;
          if (!keepBlinking) setTimeout(() => titleEl.classList.remove("typing"), 1000);
          buildSpans(titleEl, title);
          if (isHome) startAnimationLoop(title, titleEl);
        }
      };
      setTimeout(type, 350);
    } else if (isHome && state.initialRan) {
      // SPA navigation back to home: Restore instantly with spans already built
      state.finished = true;
      if (!keepBlinking) titleEl.classList.remove("typing");
      if (!state.loopActive) startAnimationLoop(title, titleEl);
    }
    // For non-home pages (or pages that shouldn't animate):
    // just display the title with spans (no animation)
  });

  const startAnimationLoop = async (title: string, el: HTMLElement): Promise<void> => {
    const state = getState();
    if (state.loopActive) return;
    state.loopActive = true;

    // 10-second delay after typing finishes
    await new Promise<void>((resolve) => {
      state.loopTimer = setTimeout(resolve, 10000);
    });

    while (state.loopActive) {
      // Double-check we are still on the homepage
      const isHome = window.location.pathname === "/" || document.body.dataset.slug === "index";
      if (!isHome) {
        state.loopActive = false;
        break;
      }

      await runGlassSweep(title, el);

      // 5-second delay between sweeps
      await new Promise<void>((resolve) => {
        state.loopTimer = setTimeout(resolve, 5000);
      });
    }
  };

  const runGlassSweep = (title: string, el: HTMLElement): Promise<void> => {
    const state = getState();
    return new Promise((resolve) => {
      el.classList.add("sweep-active");
      // Match JS timeout to CSS animation cascade completion
      const maxDelay = (title.length > 0 ? title.length - 1 : 0) * 40;
      const animDuration = 1200;
      const totalTime = maxDelay + animDuration;
      state.sweepTimer = setTimeout(() => {
        el.classList.remove("sweep-active");
        resolve();
      }, totalTime + 100);
    });
  };

  // Strict cleanup on SPA navigation away
  document.addEventListener("prenav", () => {
    const state = getState();
    state.loopActive = false;
    if (state.loopTimer) clearTimeout(state.loopTimer);
    if (state.sweepTimer) clearTimeout(state.sweepTimer);
  });
}
