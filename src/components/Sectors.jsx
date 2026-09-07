import { motion, useReducedMotion } from "framer-motion";

/* The categories worked in.

   Icons are inline SVG rather than an icon font or emoji: emoji render
   differently on every platform and can't take the fold's colour, while a
   font would be a network request for five glyphs. All five are built on the
   same 24px grid with a 1.5 stroke and currentColor, and deliberately use
   simple closed shapes — the earlier set had fussy multi-curve paths that
   turned to mush at small sizes. */

const Gem = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21 3.2 9.4 6.6 4h10.8l3.4 5.4L12 21Z" />
    <path d="M3.2 9.4h17.6" />
    <path d="M9.2 9.4 12 21l2.8-11.6L12 4 9.2 9.4Z" />
  </svg>
);

const Article = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4.5" width="18" height="15" rx="2.2" />
    <path d="M7 9.5h6M7 13.5h10M7 17h7" />
  </svg>
);

const People = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9.2" cy="8.2" r="3.4" />
    <path d="M2.8 20a6.4 6.4 0 0 1 12.8 0" />
    <circle cx="17.6" cy="9.4" r="2.4" />
    <path d="M17.6 14.2A4.4 4.4 0 0 1 22 18.6" />
  </svg>
);

const Layers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 3 7.8l9 4.8 9-4.8L12 3Z" />
    <path d="m3 12.4 9 4.8 9-4.8" />
    <path d="m3 17 9 4.8 9-4.8" />
  </svg>
);

const Drop = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.2c3.4 3.6 6 7 6 10.2a6 6 0 0 1-12 0c0-3.2 2.6-6.6 6-10.2Z" />
    <path d="M9.4 14.6a2.6 2.6 0 0 0 2.6 2.6" />
  </svg>
);

const SECTORS = [
  { label: "Luxury & Heritage Craft", Icon: Gem },
  { label: "Digital Media", Icon: Article },
  { label: "HR Tech", Icon: People },
  { label: "B2B SaaS", Icon: Layers },
  { label: "Wellness & D2C", Icon: Drop },
];

export default function Sectors() {
  const reduce = useReducedMotion();

  return (
    <section className="sectors-strip" aria-labelledby="sectors-title">
      <div className="sectors-strip__inner">
        <h2 id="sectors-title" className="section-label">
          A few worlds I've played in
        </h2>

        <ul className="sectors-strip__list">
          {SECTORS.map(({ label, Icon }, i) => (
            <motion.li
              key={label}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            >
              <span className="sectors-strip__icon"><Icon /></span>
              <span className="sectors-strip__label">{label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
