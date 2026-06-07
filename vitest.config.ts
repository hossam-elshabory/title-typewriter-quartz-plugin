import { defineConfig } from "vitest/config";
import fs from "fs";

/**
 * Vite plugin for vitest that handles `.inline.ts` files the same way
 * the tsup esbuild plugin does in the production build: reads the file
 * content and exports it as a default string export.
 *
 * Without this plugin, vitest treats `.inline.ts` files as regular
 * TypeScript modules. Since they have no exports, importing them yields
 * `undefined`, breaking components that attach scripts as properties
 * like `Component.afterDOMLoaded`.
 */
function inlineScriptVitePlugin() {
  return {
    name: "inline-script-vite-plugin",
    enforce: "pre" as const,
    async load(id: string): Promise<string | null> {
      if (!id.endsWith(".inline.ts")) return null;
      const text = await fs.promises.readFile(id, "utf8");
      return `export default ${JSON.stringify(text)}`;
    },
  };
}

export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
    reporters: ["default"],
  },
  plugins: [inlineScriptVitePlugin()],
});
