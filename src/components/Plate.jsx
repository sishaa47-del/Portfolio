import { useState } from "react";
import { motion } from "framer-motion";

/* A framed visual.
   If `src` is missing — or the file isn't there yet — this renders a designed
   placeholder naming the exact file to drop in. Add the file at that path and
   it appears automatically; no code change needed. */
export default function Plate({ src, alt, slot, className = "", innerStyle, ratio, eager = false }) {
  const [failed, setFailed] = useState(false)

  // An image with no alt is a silent accessibility hole; surface it in dev
  // rather than shipping it.
  if (import.meta.env.DEV && src && !alt) {
    console.warn("[Plate] image rendered without alt text:", src)
  };
  const showImage = src && !failed;

  return (
    <div className={`plate ${showImage ? "" : "plate--empty"} ${className}`.trim()}>
      {showImage ? (
        <motion.img
          src={src}
          alt={alt}
          /* Above-the-fold images load eagerly; the rest stay lazy but must
             carry a reserved aspect ratio, or a 0px-tall box never
             intersects the viewport and lazy loading never fires. */
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
          style={ratio ? { aspectRatio: String(ratio), ...innerStyle } : innerStyle}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="ph" role="img" aria-label={slot?.note ?? "Image placeholder"}>
          <span className="ph__corner ph__corner--tl" aria-hidden="true" />
          <span className="ph__corner ph__corner--br" aria-hidden="true" />

          <div className="ph__body">
            <span className="ph__kind">{slot?.kind ?? "Image"}</span>
            {slot?.project && <span className="ph__project">{slot.project}</span>}
            {slot?.note && <p className="ph__note">{slot.note}</p>}
          </div>

          <div className="ph__spec">
            <span className="ph__file">{slot?.file ?? "—"}</span>
            <span className="ph__size">{slot?.size ?? ""}</span>
          </div>
        </div>
      )}
    </div>
  );
}
