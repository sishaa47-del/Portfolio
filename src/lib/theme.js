/* Applies a fold's palette by writing CSS custom properties on <html>.

   Custom properties don't animate, so the crossfade lives on the elements
   that consume them (see the `transition` rules in showcase.css) rather
   than here. */
export function applyTheme(theme) {
  if (!theme) return;
  const r = document.documentElement.style;
  r.setProperty("--bg", theme.bg);
  r.setProperty("--fg", theme.fg);
  r.setProperty("--fg-soft", theme.soft);
  r.setProperty("--fg-faint", theme.faint);
  r.setProperty("--accent", theme.accent);
  // frame and hairline tints have to follow the ink, not the background,
  // or they vanish on the pastel folds
  const ink = theme.fg.toLowerCase() === "#f7f5f3";
  r.setProperty("--line", ink ? "rgba(247,245,243,0.16)" : "rgba(23,19,32,0.20)");
  r.setProperty("--frame", ink ? "rgba(247,245,243,0.12)" : "rgba(23,19,32,0.16)");
  r.setProperty("--bg-raised", ink ? "rgba(247,245,243,0.06)" : "rgba(23,19,32,0.07)");
  r.setProperty("--shadow", ink
    ? "0 40px 90px -34px rgba(0,0,0,0.92)"
    : "0 30px 70px -30px rgba(23,19,32,0.45)");
}
