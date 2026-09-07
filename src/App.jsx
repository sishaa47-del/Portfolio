import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

function PageTransition({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop pathname={location.pathname} hash={location.hash} />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Showcase />
              </PageTransition>
            }
          />
          <Route path="/images" element={<Picker />} />
          <Route path="/palette" element={<Palette />} />
          <Route
            path="/work/:slug"
            element={
              <PageTransition>
                <ProjectPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
