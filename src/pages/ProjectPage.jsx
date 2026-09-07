import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Plate from "../components/Plate";
import PrototypeEmbed from "../components/PrototypeEmbed";
import { resolveImage, imageRatio } from "../lib/images";
import { applyTheme } from "../lib/theme";
import { setMeta } from "../lib/meta";
import { getProject } from "../data/projects";
import { slides, getSlide } from "../data/showcase";
import { getPrototypes } from "../data/prototypes";

export default function ProjectPage() {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const project = getProject(slug);
  const visual = getSlide(slug);
  const protos = getPrototypes(slug);

  /* The case page wears the same colour as its fold, so arriving from the
     homepage feels continuous rather than like a different site. */
  useEffect(() => {
    if (visual?.theme) applyTheme(visual.theme);
  }, [visual]);

  useEffect(() => {
    if (!project) return;
    setMeta({
      title: `${visual?.title ?? project.title}`,
      description: visual?.line ?? project.context,
      image: resolveImage(visual?.hero),
    });
  }, [project, visual]);

  // a project only exists on the site if it has a fold on the homepage
  if (!project || !visual) return <Navigate to="/" replace />;

  const index = slides.findIndex((s) => s.slug === slug);
  const prev = slides[(index - 1 + slides.length) % slides.length];
  const next = slides[(index + 1) % slides.length];

  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <>

      <div className="chrome">
        <Link to="/" className="mark">Manasi Sharma</Link>
        <a href="mailto:sharma.manasi7@gmail.com" className="to-about">Contact</a>
      </div>

      <div className="case-wrap">
        <header className="case-header">
          <Link to="/" className="backlink">← All work</Link>
          {visual.award && <div className="case-award">{visual.award}</div>}
          <h1>{project.title}</h1>
          <p className="ctx">{project.context}</p>
          {project.tags?.length > 0 && (
            <ul className="case-tags">
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </header>

        <motion.figure
          className="case-figure"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Plate
            src={resolveImage(visual.hero)}
            alt={visual.heroAlt}
            ratio={imageRatio(visual.hero)}
            eager
            slot={{
              project: visual.title,
              kind: "Hero image",
              file: `${visual.hero}.jpg`,
              size: "1600 × 900",
              note: visual.heroNote,
            }}
          />
        </motion.figure>

        {project.figures?.length > 0 && (
          <div className="case-metrics">
            {project.figures.map((f) => (
              <div className="m" key={f.k}>
                <span className="v tnum">{f.v}</span>
                <span className="u">{f.k}</span>
              </div>
            ))}
          </div>
        )}

        <main>
          {project.sections.map((s) => (
            <motion.section className="case-section" key={s.label} {...rise()}>
              <span className="k">{s.label}</span>
              <div className="body">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.after?.map((p, i) => (
                  <p key={`after-${i}`}>{p}</p>
                ))}
              </div>
              {s.note && <p className="note">{s.note}</p>}
            </motion.section>
          ))}

          {protos.length > 0 && (
            <motion.div {...rise()}>
              <PrototypeEmbed items={protos} />
            </motion.div>
          )}

          {project.proof && (
            <motion.figure className="case-proof" {...rise()}>
              <Plate
                src={resolveImage(project.proof)}
                alt={project.proofCaption ?? "Award certificate"}
                ratio={imageRatio(project.proof)}
                className="plate--proof"
                slot={{
                  project: visual.title,
                  kind: "Proof",
                  file: `${project.proof}.jpg`,
                  size: "—",
                  note: project.proofCaption,
                }}
              />
              {project.proofCaption && <figcaption>{project.proofCaption}</figcaption>}
            </motion.figure>
          )}
        </main>

        <nav className="case-nav">
          <Link to={`/work/${prev.slug}`}>
            <span className="dir">← Previous</span>
            <span className="nm">{prev.title}</span>
          </Link>
          <Link to={`/work/${next.slug}`} className="to">
            <span className="dir">Next →</span>
            <span className="nm">{next.title}</span>
          </Link>
        </nav>

        <footer className="outro" id="contact">
          <h2>Let's talk.</h2>
          <div className="links">
            <a href="mailto:sharma.manasi7@gmail.com">sharma.manasi7@gmail.com</a>
            <a href="tel:+918860104084">+91 88601 04084</a>
            <a href="https://www.linkedin.com/in/manasi-sharma07" target="_blank" rel="noopener">
              LinkedIn ↗
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
