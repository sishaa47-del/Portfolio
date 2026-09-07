/* Per-page document title and Open Graph tags.

   IMPORTANT LIMITATION: this is a client-side SPA, so these tags are written
   after the page boots. Crawlers that execute JavaScript (Google, and
   Slack/Twitter in some cases) will see them; many link unfurlers read the
   raw HTML only and will fall back to whatever is in index.html. Getting
   real per-route previews needs prerendering at build time — see the note in
   README. Setting them here is still worth doing: it fixes the browser tab,
   bookmarks, and the crawlers that do run JS. */

const SITE = "Manasi Sharma";

function put(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export function setMeta({ title, description, image, url }) {
  const full = title ? `${title} — ${SITE}` : SITE;
  document.title = full;

  put("name", "description", description);
  put("property", "og:title", full);
  put("property", "og:description", description);
  put("property", "og:type", "article");
  put("name", "twitter:card", image ? "summary_large_image" : "summary");
  put("name", "twitter:title", full);
  put("name", "twitter:description", description);

  const absolute = image ? new URL(image, window.location.origin).href : null;
  put("property", "og:image", absolute);
  put("name", "twitter:image", absolute);
  put("property", "og:url", url ?? window.location.href);
}

export const SITE_META = {
  title: null,
  description:
    "Brand strategist — building the case for brand, one problem at a time. Three years in B2B SaaS product marketing, plus four brand strategy engagements, two of them award-winning.",
};
