import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

/* Two build targets.

   Default — a normal multi-file build for real hosting (Vercel, Netlify),
   where routes are real URLs and assets are cached separately.

   SINGLEFILE=1 — everything (JS, CSS, images) inlined into one HTML file so
   the whole site can be published as a single shareable page. That build
   also switches to hash routing, because there is no server to rewrite
   /work/... back to index.html. */
const singleFile = process.env.SINGLEFILE === "1";

/* GitHub Pages serves a project site from /<repo>/ and has no rewrite rules,
   so this mode uses relative asset paths (works at any subpath, including a
   custom domain at the root) and hash routing, because a deep link like
   /work/dot would otherwise 404 on refresh. */
const ghPages = process.env.GHPAGES === "1";
const hashRouter = singleFile || ghPages;

export default defineConfig({
  base: ghPages ? "./" : "/",
  plugins: [react(), ...(singleFile ? [viteSingleFile()] : [])],
  // "@" -> src, the shadcn convention, so components dropped in from a
  // registry keep their published import paths unchanged.
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  define: {
    __HASH_ROUTER__: JSON.stringify(hashRouter),
    // a published single-file page runs in a sandbox that refuses
    // third-party frames, so it links out instead of embedding
    __EMBED_FRAMES__: JSON.stringify(!singleFile),
  },
  build: singleFile
    ? {
        // inline every asset regardless of size
        assetsInlineLimit: Number.MAX_SAFE_INTEGER,
        cssCodeSplit: false,
        outDir: "dist-single",
        chunkSizeWarningLimit: 20000,
      }
    : {},
});
