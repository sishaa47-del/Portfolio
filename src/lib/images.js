/* Resolves artwork by name from src/images/.
   Vite reads the folder at build time, so a missing file is known up front —
   the placeholder renders cleanly instead of flashing a broken image.
   Drop a file into src/images/ and it appears on the next save. */

export { imageRatio } from "./image-dims";

const modules = import.meta.glob("../images/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
});

const byName = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const file = path.split("/").pop();
    const name = file.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");
    return [name, url];
  })
);

/** Returns the bundled URL for an image name, or null if it isn't there yet. */
export function resolveImage(name) {
  if (!name) return null;
  return byName[name] ?? null;
}

/** Names of every image currently present — used by the image plan page. */
export const availableImages = new Set(Object.keys(byName));
