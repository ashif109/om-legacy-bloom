import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    alias: {
      "punycode/": "punycode",
    },
  },
  vite: {
    resolve: {
      alias: [
        { find: /^punycode\//, replacement: "punycode" },
      ],
    },
  },
});
