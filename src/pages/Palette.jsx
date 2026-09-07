import { Link } from "react-router-dom";
import { slides, BASE_THEME, NUMBERS_THEME } from "../data/showcase";

const TEXT = "#F2F0EE";
const SOFT = "#A8A5A2";
const GOLD = "#E4B363";

/* WCAG relative luminance, so the ratios shown here are computed rather
   than asserted — if a colour is edited, this page tells the truth. */
const lin = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const lum = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

const FOLDS = [
  { name: "Hero", ...BASE_THEME, why: "Black. Attention peaks at entry." },
  { name: "By the numbers", ...NUMBERS_THEME, why: "Barely lifted." },
  ...slides.map((s) => ({ name: s.title, ...s.theme, why: null })),
  { name: "Contact", ...BASE_THEME, why: "Back to black. Bookend." },
];

export default function Palette() {
  return (
    <div className="pal">

      <header className="pal__head">
        <Link to="/" className="backlink">← Back to site</Link>
        <h1>The fold ramp</h1>
        <p>
          Ten folds, black to warm and back. Contrast ratios are computed live against
          the three text colours actually used — body, secondary and the gold accent.
        </p>
      </header>

      <div className="pal__grid">
        {FOLDS.map((f, i) => (
          <div className="sw" key={`${f.name}-${i}`} style={{ background: f.bg }}>
            <div className="sw__top">
              <span className="sw__n tnum" style={{ color: f.faint }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="sw__name" style={{ color: f.fg }}>{f.name}</span>
            </div>
            <span className="sw__hex tnum" style={{ color: f.soft }}>{f.bg.toUpperCase()}</span>
            <div className="sw__ratios tnum">
              <span style={{ color: f.fg }}>{ratio(f.fg, f.bg).toFixed(1)}</span>
              <span style={{ color: f.soft }}>{ratio(f.soft, f.bg).toFixed(1)}</span>
              <span style={{ color: f.accent }}>{ratio(f.accent, f.bg).toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pal__shapes">
        <figure>
          <div className="plate plate--empty" />
          <figcaption>Landscape plate — top and bottom edges bow</figcaption>
        </figure>
        <figure>
          <div className="plate plate--empty plate--portrait" />
          <figcaption>Portrait plate — the bow runs down the sides</figcaption>
        </figure>
        <figure className="pal__rail-demo">
          <div className="rail rail--static">
            {FOLDS.map((f, i) => (
              <span key={i} className={i < 4 ? "seen" : i === 4 ? "here" : ""} />
            ))}
          </div>
          <figcaption>Progress rail — passed, current, upcoming</figcaption>
        </figure>
      </div>
    </div>
  );
}
