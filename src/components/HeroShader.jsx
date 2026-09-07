import { motion, useReducedMotion } from "framer-motion";
import { ShaderBackground } from "@/components/ui/pulsing-border";

/* The pulsing border behind the hero fold.

   Three deliberate constraints:

   1. It is staging, not the subject. The hero's job is the name and the
      positioning line; the shader fades in *after* them and sits at low
      opacity so it frames rather than competes. (Disney's staging principle:
      the background recedes so the subject reads.)

   2. It never runs under prefers-reduced-motion. This is a continuously
      animating full-screen canvas — the one thing that setting exists to
      stop — so it isn't rendered at all rather than merely paused, which
      also avoids holding a WebGL context for nothing.

   3. The canvas is inset to the content area (see .intro__shader), so the
      outline frames the hero rather than cutting across it, and clears the
      fixed nav. Its ground colour matches the fold, so the canvas edge is
      invisible. */
export default function HeroShader() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className="intro__shader"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      /* animates to the stylesheet's value — an inline opacity from Framer
         would otherwise override it. The line is a hairline now, so it can
         sit brighter without competing with the type. */
      animate={{ opacity: 0.9 }}
      /* slow in, and behind the copy: the text lands first (0.7s), the
         ground arrives under it */
      transition={{ duration: 1.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <ShaderBackground
        className="intro__shader-canvas"
        /* A soft glow behind type gains nothing from retina resolution.
           DPR 1 and a smaller budget cut the per-frame fill by roughly 4x,
           which is what this costs on a laptop GPU. */
        maxDpr={1}
        pixelBudget={900_000}
      />
    </motion.div>
  );
}
