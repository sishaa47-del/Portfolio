import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Slide from "../components/Slide";
import Impact from "../components/Impact";
import Sectors from "../components/Sectors";
import Plate from "../components/Plate";
import HeroShader from "../components/HeroShader";
import { resolveImage, imageRatio } from "../lib/images";
import { slides, GROUP_LABEL, BASE_THEME, NUMBERS_THEME, INTRO_IMAGE } from "../data/showcase";
import { applyTheme } from "../lib/theme";

/* Labels for the progress rail, in document order:
   intro, the numbers band, every project fold, then the close. */
const RAIL_LABELS = ["Intro", "By the numbers", ...slides.map((s) => s.title), "Contact"];
const ZONE_THEMES = [BASE_THEME, NUMBERS_THEME, ...slides.map((s) => s.theme), BASE_THEME];

export default function Showcase() {
  const reduce = useReducedMotion();
  const zonesRef = useRef([]);
  const [index, setIndex] = useState(0);

  /* Which fold owns the screen right now — drives the rail and the colour.

     Measured against the viewport midpoint rather than with an
     IntersectionObserver: several full-height folds satisfy a threshold at
     once, and whichever fired last would win arbitrarily.

     The fold boundaries are measured once and cached, so scrolling is pure
     arithmetic — no getBoundingClientRect per fold per frame, which forces a
     layout. And the theme is only written when the fold actually changes:
     re-setting eight CSS custom properties on every scroll event triggers a
     style recalculation of the whole document each frame. Both of those are
     what made scrolling feel rough once a WebGL canvas was also drawing. */
  useEffect(() => {
    const zones = Array.from(document.querySelectorAll("[data-bg]"));
    zonesRef.current = zones;
    if (!zones.length) return;

    let bounds = [];
    let current = -1;

    const pick = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let i = bounds.findIndex((b) => mid >= b.top && mid < b.bottom);
      if (i === -1) i = mid < bounds[0]?.top ? 0 : bounds.length - 1;
      if (i === current) return;
      current = i;
      setIndex(i);
      applyTheme(ZONE_THEMES[i]);
    };

    const remeasure = () => {
      const y = window.scrollY;
      bounds = zones.map((z) => {
        const r = z.getBoundingClientRect();
        return { top: r.top + y, bottom: r.bottom + y };
      });
      current = -1; // boundaries moved, so re-apply even if the index matches
      pick();
    };

    remeasure();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", remeasure);
    // images and fonts land after first paint and shift every boundary below
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", remeasure);
      ro.disconnect();
    };
  }, []);

  const go = (i) =>
    zonesRef.current[i]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });

  return (
    <>

      <div className="chrome">
        <Link to="/" className="mark">Manasi Sharma</Link>
        <a href="mailto:sharma.manasi7@gmail.com" className="to-about">Contact</a>
      </div>

      <nav className="rail" aria-label="Progress">
        {RAIL_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => go(i)}
            className={i < index ? "seen" : i === index ? "here" : ""}
            aria-current={i === index}
            aria-label={label}
          />
        ))}
        <span className="rail__count tnum" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}/{String(RAIL_LABELS.length).padStart(2, "0")}
        </span>
      </nav>

      <header className="intro" data-bg="">
        <HeroShader />

        <motion.div
          className="intro__copy"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="kicker">Brand Strategist</div>
          <h1>
            Manasi
            <br />
            Sharma
          </h1>

          <p className="say say--lead">I like figuring out why people care.</p>
          <p className="say">
            I work across brand strategy and B2B product marketing, finding the insight,
            sharpening the point of view, and turning it into something people remember.
          </p>

          <div className="intro__disciplines">
            Positioning · GTM · Brand Strategy · Growth
          </div>
        </motion.div>

        <motion.div
          className="intro__visual"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <Plate
            src={resolveImage(INTRO_IMAGE.name)}
            alt={INTRO_IMAGE.alt}
            ratio={imageRatio(INTRO_IMAGE.name)}
            eager
            className="plate--portrait"
            slot={{
              project: "Manasi Sharma",
              kind: "Portrait",
              file: `${INTRO_IMAGE.name}.jpg`,
              size: INTRO_IMAGE.size,
              note: INTRO_IMAGE.note,
            }}
          />
          <p className="intro__now">
            Currently exploring the space between brand, product and culture.
          </p>
        </motion.div>
      </header>

      <Sectors />

      <Impact />

      <main>
        {slides.map((s, i) => {
          const isFirstOfGroup = i === 0 || slides[i - 1].group !== s.group;
          return (
            <Fragment key={s.slug}>
              {isFirstOfGroup && (
                <motion.div
                  className="group-divider"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="section-label">{GROUP_LABEL[s.group]}</span>
                </motion.div>
              )}
              <Slide project={s} index={i} total={slides.length} />
            </Fragment>
          );
        })}
      </main>

      <footer className="outro" id="contact" data-bg="">
        <h2>Let's talk.</h2>
        <div className="links">
          <a href="mailto:sharma.manasi7@gmail.com">sharma.manasi7@gmail.com</a>
          <a href="tel:+918860104084">+91 88601 04084</a>
          <a href="https://www.linkedin.com/in/manasi-sharma07" target="_blank" rel="noopener">
            LinkedIn ↗
          </a>
        </div>
        <div className="fine">PGDM, MDI Gurgaon · Open to strategy, GTM and brand roles</div>
      </footer>
    </>
  );
}
