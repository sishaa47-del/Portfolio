import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Showcase from "./pages/Showcase";
import ProjectPage from "./pages/ProjectPage";
import Picker from "./pages/Picker";
import Palette from "./pages/Palette";

function ScrollToTop({ pathname, hash }) {
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const location = useLocation();
  const reduce = useReducedMotion();

  /* Deliberately NOT wrapped in <AnimatePresence mode="wait">.

     That setup stalled: AnimatePresence waits for the outgoing page's exit
     animation to resolve before mounting the incoming one, and here it never
     resolved — so clicking "Open case study" changed the URL and rendered
     nothing at all. It looked fine only because a fresh page load mounts
     directly, with no outgoing page to animate away, which is how these
     pages were usually opened during development.

     Keying a fade-IN on the pathname gives the same felt transition with no
     exit to coordinate, so navigation can't deadlock. */
  return (
    <>
      <ScrollToTop pathname={location.pathname} hash={location.hash} />
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Showcase />} />
          <Route path="/images" element={<Picker />} />
          <Route path="/palette" element={<Palette />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
        </Routes>
      </motion.div>
    </>
  );
}
