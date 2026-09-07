import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Plate from "./Plate";
import { resolveImage, imageRatio } from "../lib/images";

/* The 3D tilt is a desktop affordance: on a narrow screen the plate is
   nearly full-bleed, so rotating it in space buys little and risks pushing
   past the viewport edge. */
function useWideEnough() {
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 920px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 920px)");
    const on = (e) => setWide(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

export default function Slide({ project, index, total, innerRef }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const wide = useWideEnough();
  const still3d = reduce || !wide;

  const setNode = (el) => {
    ref.current = el;
    if (typeof innerRef === "function") innerRef(el);
    else if (innerRef) innerRef.current = el;
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 1. parallax drift — the plate travels slower than the page
  const yRaw = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const y = useSpring(yRaw, { stiffness: 120, damping: 26, mass: 0.6 });

  // 2. perspective tilt — the plate rotates through flat as it centres
  const rotateYRaw = useTransform(scrollYProgress, [0, 0.5, 1], [11, 0, -11]);
  const rotateY = useSpring(rotateYRaw, { stiffness: 110, damping: 24 });
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-3.2, 1.6]);

  // 3. velocity skew — the liquid part: fast scrolling deforms the plate,
  //    and the spring settles it back the moment you stop
  const velocity = useVelocity(scrollYProgress);
  const skewRaw = useTransform(velocity, [-2.5, 0, 2.5], [7, 0, -7], { clamp: true });
  const skewY = useSpring(skewRaw, { stiffness: 260, damping: 34, mass: 0.4 });

  // 4. counter-drift inside the frame, so the image floats within its own crop
  const innerY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const stackY = useSpring(
    useTransform(scrollYProgress, [0, 1], [130, -60]),
    { stiffness: 100, damping: 24 }
  );

  const still = still3d
    ? { y: 0, rotateY: 0, rotateZ: 0, skewY: 0 }
    : { y, rotateY, rotateZ, skewY };

  return (
    <section
      className="slide"
      ref={setNode}
      id={`slide-${index}`}
      data-bg={project.theme?.bg}
      aria-labelledby={`t-${project.slug}`}
    >
      <motion.div
        className="slide__copy"
        initial={reduce ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="slide__index tnum">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          {project.award && <span className="slide__award"> — {project.award}</span>}
        </div>

        <h2 id={`t-${project.slug}`}>{project.title}</h2>
        {project.where && <div className="slide__where">{project.where}</div>}
        <p className="slide__line">{project.line}</p>

        {project.metric && (
          <div className="slide__metric">
            <span className="v tnum">{project.metric.value}</span>
            <span className="u">{project.metric.unit}</span>
          </div>
        )}

        <Link to={`/work/${project.slug}`} className="slide__cta">
          Open case study <span aria-hidden="true">→</span>
        </Link>
      </motion.div>

      <div className="slide__visual">
        <motion.div className="tilt" style={still}>
          <Plate
            src={resolveImage(project.hero)}
            alt={project.heroAlt}
            ratio={imageRatio(project.hero)}
            eager={index === 0}
            slot={{
              project: project.title,
              kind: "Hero image",
              file: `${project.hero}.jpg`,
              size: "1600 × 1000",
              note: project.heroNote,
            }}
            innerStyle={still3d ? undefined : { y: innerY }}
          />
        </motion.div>

        {project.stack && (
          <motion.div className="plate-stack" style={still3d ? undefined : { y: stackY }}>
            <Plate
              src={resolveImage(project.stack)}
              alt={project.stackAlt}
              ratio={imageRatio(project.stack)}
              slot={{
                project: project.title,
                kind: "Secondary",
                file: `${project.stack}.jpg`,
                size: "1200 × 900",
                note: project.stackNote,
              }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
