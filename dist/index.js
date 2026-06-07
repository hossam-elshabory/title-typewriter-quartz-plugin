import { createRequire } from 'module';

createRequire(import.meta.url);

// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/styles/typewriter.scss
var typewriter_default = 'h2.page-title {\n  margin: 0;\n  padding: 0;\n  line-height: 1;\n}\n\n#typewriter-title {\n  font-family: var(--headerFont);\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: var(--dark);\n  text-decoration: none;\n  display: inline-flex;\n  align-items: baseline;\n  flex-wrap: wrap;\n  gap: 0;\n  /* Blinking cursor */\n}\n#typewriter-title.typing::after {\n  content: "|";\n  color: var(--secondary);\n  margin-left: 2px;\n  animation: tw-blink var(--blink-speed, 0.65s) step-end infinite;\n}\n#typewriter-title {\n  /* Glass letter spans */\n}\n#typewriter-title .glass-letter {\n  display: inline;\n  will-change: color, text-shadow;\n}\n#typewriter-title {\n  /* Smooth Glass Reflection Sweep */\n}\n#typewriter-title.sweep-active .glass-letter {\n  animation: tw-glass-beam 1.2s ease-in-out forwards;\n  animation-delay: var(--delay);\n}\n\n@keyframes tw-blink {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n  }\n}\n@keyframes tw-glass-beam {\n  0% {\n    color: var(--dark);\n    text-shadow: none;\n  }\n  15% {\n    /* Leading edge: sharp white highlight */\n    color: #ffffff;\n    text-shadow: 0 0 2px rgba(255, 255, 255, 0.9), 0 0 8px var(--tertiary);\n  }\n  35% {\n    /* Mid-beam: tinted glow */\n    color: var(--tertiary);\n    text-shadow: 0 0 4px var(--tertiary), 0 0 12px rgba(255, 255, 255, 0.4);\n  }\n  60% {\n    /* Trailing edge: soft fade */\n    color: var(--tertiary);\n    text-shadow: 0 0 3px var(--tertiary);\n  }\n  100% {\n    /* Return to normal */\n    color: var(--dark);\n    text-shadow: none;\n  }\n}';

// src/components/scripts/typewriter.inline.ts
var typewriter_inline_default = 'function r(){let n=window;return n._typewriterState||(n._typewriterState={initialRan:!1,loopActive:!1,loopTimer:null,sweepTimer:null,finished:!1}),n._typewriterState}function u(n,l){n.innerHTML="";let t=document.createDocumentFragment();for(let i=0;i<l.length;i++){let e=document.createElement("span");e.textContent=l[i]??null,e.className="glass-letter",e.style.setProperty("--delay",i*.04+"s"),e.setAttribute("aria-hidden","true"),t.appendChild(e)}n.appendChild(t)}if(typeof window<"u"){document.addEventListener("nav",()=>{let t=r(),i=document.getElementById("typewriter-title");if(!i)return;let e=i,a=e.closest(".page-title");document.querySelectorAll(".page-title").forEach(s=>{s!==a&&s.remove()});let o=e.getAttribute("data-title")||"",m=e.getAttribute("data-keep-blinking")==="true",p=e.getAttribute("data-blink-speed")||"650",f=e.getAttribute("data-animate-only-on-home")!=="false";e.style.setProperty("--blink-speed",p+"ms");let c=window.location.pathname==="/"||document.body.dataset.slug==="index";if(u(e,o),(f?c:!0)&&!t.initialRan){t.initialRan=!0,t.loopActive=!1,e.textContent="",e.classList.add("typing");let s=0,d=()=>{s<o.length?(s++,e.textContent=o.substring(0,s),setTimeout(d,parseInt(e.getAttribute("data-speed")||"85"))):(t.finished=!0,m||setTimeout(()=>e.classList.remove("typing"),1e3),u(e,o),c&&n(o,e))};setTimeout(d,350)}else c&&t.initialRan&&(t.finished=!0,m||e.classList.remove("typing"),t.loopActive||n(o,e))});let n=async(t,i)=>{let e=r();if(!e.loopActive)for(e.loopActive=!0,await new Promise(a=>{e.loopTimer=setTimeout(a,1e4)});e.loopActive;){if(!(window.location.pathname==="/"||document.body.dataset.slug==="index")){e.loopActive=!1;break}await l(t,i),await new Promise(o=>{e.loopTimer=setTimeout(o,5e3)})}},l=(t,i)=>{let e=r();return new Promise(a=>{i.classList.add("sweep-active");let p=(t.length>0?t.length-1:0)*40+1200;e.sweepTimer=setTimeout(()=>{i.classList.remove("sweep-active"),a()},p+100)})};document.addEventListener("prenav",()=>{let t=r();t.loopActive=!1,t.loopTimer&&clearTimeout(t.loopTimer),t.sweepTimer&&clearTimeout(t.sweepTimer)})}\n';
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/TypewriterTitle.tsx
var defaultOptions = {
  typingSpeed: 85,
  keepBlinking: false,
  blinkSpeed: 650,
  animateOnlyOnHome: true
};
var TypewriterTitle_default = ((userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  const Component = ({ cfg, displayClass }) => {
    const title = cfg?.pageTitle ?? "Untitled";
    return /* @__PURE__ */ u2("h2", { class: classNames(displayClass, "page-title"), children: /* @__PURE__ */ u2(
      "a",
      {
        href: "/",
        id: "typewriter-title",
        "aria-label": title,
        "data-title": title,
        "data-speed": opts.typingSpeed,
        "data-keep-blinking": String(opts.keepBlinking),
        "data-blink-speed": opts.blinkSpeed,
        "data-animate-only-on-home": String(opts.animateOnlyOnHome),
        children: /* @__PURE__ */ u2("noscript", { children: title })
      }
    ) });
  };
  Component.css = typewriter_default;
  Component.afterDOMLoaded = typewriter_inline_default;
  return Component;
});

export { TypewriterTitle_default as TypewriterTitle };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map