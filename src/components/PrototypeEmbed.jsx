import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* A live prototype, running inside the case study.

   Loading is deferred behind a click: several of these on one page would
   otherwise pull in four full sites before a reader has asked for any of
   them. Once started, it's the real thing — scrollable, clickable, keyboard
   reachable — with an escape hatch to a new tab, because a framing policy
   or a privacy extension can still block the embed and the work has to stay
   reachable when it does. */
export default function PrototypeEmbed({ items }) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [started, setStarted] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const loadedRef = useRef(false);

  /* Some contexts refuse third-party frames outright — a strict embedding
     sandbox, a corporate proxy, a privacy extension. A blocked frame just
     sits there blank, which reads as a broken site rather than a blocked
     one, so if nothing has loaded after a few seconds we say so and point
     at the new-tab link instead. */
  useEffect(() => {
    if (!started || !__EMBED_FRAMES__) return;
    loadedRef.current = false;
    setBlocked(false);
    const t = setTimeout(() => {
      if (!loadedRef.current) setBlocked(true);
    }, 6000);
    return () => clearTimeout(t);
  }, [started, activeId]);

  if (!items?.length) return null;
  const active = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <section className="proto" aria-label="Interactive prototypes">
      <div className="proto__head">
        <span className="k">Try it</span>
        <p className="proto__intro">
          These are working prototypes, not screenshots — click into them.
        </p>
      </div>

      {items.length > 1 && (
        <div className="proto__tabs" role="tablist">
          {items.map((i) => (
            <button
              key={i.id}
              role="tab"
              aria-selected={i.id === active.id}
              className={i.id === active.id ? "on" : ""}
              onClick={() => {
                setActiveId(i.id);
                setStarted(false);
              }}
            >
              {i.label}
            </button>
          ))}
        </div>
      )}

      <motion.div
        key={active.id}
        className={`proto__frame proto__frame--${active.device}`}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {__EMBED_FRAMES__ && started && !blocked ? (
          <iframe
            src={active.url}
            title={`${active.label} — interactive prototype`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            referrerPolicy="no-referrer"
            onLoad={() => {
              loadedRef.current = true;
            }}
          />
        ) : !__EMBED_FRAMES__ || blocked ? (
          <a
            className="proto__start proto__start--blocked"
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="proto__play" aria-hidden="true">↗</span>
            <span className="proto__startlabel">Open {active.label}</span>
            <span className="proto__starthint">Live prototype — opens in a new tab</span>
            {/* shown as text too, so it stays reachable even if the
                surrounding page blocks the click from opening a tab */}
            <span className="proto__url">{active.url.replace("https://", "")}</span>
          </a>
        ) : (
          <button className="proto__start" onClick={() => setStarted(true)}>
            <span className="proto__play" aria-hidden="true">▶</span>
            <span className="proto__startlabel">Launch {active.label}</span>
            <span className="proto__starthint">Loads the live prototype</span>
          </button>
        )}
      </motion.div>

      <div className="proto__meta">
        <p className="proto__caption">{active.caption}</p>
        <a className="proto__out" href={active.url} target="_blank" rel="noopener noreferrer">
          Open in a new tab ↗
        </a>
      </div>
    </section>
  );
}
