import { motion, useReducedMotion } from "framer-motion";
import { headline } from "../data/impact";

/* The numbers, up front. The roles themselves are folds further down. */
export default function Impact() {
  const reduce = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section className="impact" id="impact" aria-labelledby="impact-title" data-bg="">
      <div className="impact__inner">
        <motion.header className="impact__head" {...rise()}>
          <div className="section-label">By the numbers</div>
          <h2 id="impact-title">
            Three years shipping GTM
            <br />
            in B2B SaaS.
          </h2>
        </motion.header>

        <motion.div className="impact__figures" {...rise(0.08)}>
          {headline.map((h) => (
            <div className="fig" key={h.unit}>
              <span className="fig__v tnum">{h.value}</span>
              <span className="fig__u">{h.unit}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
