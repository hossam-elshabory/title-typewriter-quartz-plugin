# Title Typewriter — Quartz v5 Plugin

A Quartz v5 component plugin that renders the site title with a typewriter
animation and an optional glass reflection sweep effect.

## Highlights

- ✅ Typewriter animation on home page (configurable)
- ✅ Glass beam sweep animation after typing completes
- ✅ Blinking cursor with configurable speed and persistence
- ✅ Zero layout shift — uses DocumentFragment for DOM insertion
- ✅ Full SPA support — survives navigation, cleans up timers
- ✅ TypeScript-first with exported types
- ✅ SCSS styles compiled at build time
- ✅ Inline script transpiled from `.inline.ts` for type safety

## Installation

```bash
npx quartz plugin add github:hossam-elshabory/title-typewriter-quartz-plugin
```

Then add it to your `quartz.config.yaml`:

```yaml
plugins:
  - source: github:hossam-elshabory/title-typewriter-quartz-plugin
    enabled: true
    options:
      typingSpeed: 85
      keepBlinking: false
      blinkSpeed: 650
      animateOnlyOnHome: true
    layout:
      position: left
      priority: 10
```

The `layout` section is optional — the plugin declares `defaultPosition: left`
and `defaultPriority: 10` in its manifest, so it will be placed automatically
if you omit the layout block.

## Options

| Option              | Type      | Default | Description                                                                                                                           |
| ------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `typingSpeed`       | `number`  | `85`    | Milliseconds per character during typing. Lower is faster.                                                                            |
| `keepBlinking`      | `boolean` | `false` | Whether the cursor keeps blinking indefinitely after typing finishes.                                                                 |
| `blinkSpeed`        | `number`  | `650`   | Speed of the blink cycle in milliseconds.                                                                                             |
| `animateOnlyOnHome` | `boolean` | `true`  | Only play the typing animation on the home page. When `false`, typing plays on the first page visited regardless of which page it is. |

## Advanced Usage (TypeScript Override)

If you need to use the plugin in `quartz.ts` for advanced overrides:

```ts
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader";
import * as TypewriterPlugin from "./.quartz/plugins";

const config = await loadQuartzConfig();
export default config;

export const layout = await loadQuartzLayout({
  byPageType: {
    content: {
      left: [TypewriterPlugin.TypewriterTitle({ typingSpeed: 50, keepBlinking: true })],
    },
  },
});
```

## Animation Behavior

### Typing Animation

- On the **home page**: The title types out character by character on the first visit.
  On SPA navigation back to home, the title appears instantly.
- On **other pages**: The title appears instantly with glass-letter spans (no typing).
- When `animateOnlyOnHome` is `false`: The typing animation plays on the very first
  page visited (regardless of which page). After that, all pages show instantly.

### Glass Sweep Animation

After the typing animation completes on the home page, a glass reflection sweep
runs in a loop with a 10-second delay after typing and 5-second intervals between
sweeps. The sweep stops automatically when navigating away from the home page.

### Cursor Blinking

A blinking cursor (`|`) appears during the typing animation. By default it stops
blinking 1 second after typing completes. Set `keepBlinking: true` to keep it
blinking indefinitely.

## Building

```bash
npm install
npm run build
```

> [!important]
> After building, the `dist/` directory should be committed to the repository.
> It is not gitignored, as Quartz uses it for pre-built distribution.

## Testing

```bash
npm test
```

## License

MIT
