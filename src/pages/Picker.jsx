import { Link } from "react-router-dom";
import { imageSlots } from "../data/showcase";
import { availableImages } from "../lib/images";

/* Working page: the exact list of artwork the site is waiting for.
   Not linked from the site itself. */
export default function Picker() {
  return (
    <div className="plan">
      <div className="plan__head">
        <Link to="/" className="backlink">← Back to site</Link>
        <h1>Image plan</h1>
        <p>
          Every image slot on the site. Save each file into{" "}
          <code>portfolio-site/src/images/</code> using the exact filename below — the placeholder
          is replaced automatically, no code change needed.
        </p>
        <p>
          Hero images sit at <strong>16:10</strong>, secondary at <strong>4:3</strong>. Both get
          cropped from the centre-top, so keep anything critical away from the bottom edge. Export
          JPG (or PNG for flat graphics) under roughly 400KB each.
        </p>
      </div>

      <table className="plan__table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Slot</th>
            <th>Filename</th>
            <th>Size</th>
            <th>Suggested content</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {imageSlots.map((s) => (
            <tr key={s.file}>
              <td>{s.project}</td>
              <td><span className="plan__kind">{s.kind}</span></td>
              <td><span className="plan__file">{s.file}</span></td>
              <td><span className="plan__size">{s.size}</span></td>
              <td>{s.note}</td>
              <td>
                <span className={availableImages.has(s.file.replace(/\.\w+$/, "")) ? "plan__done" : "plan__todo"}>
                  {availableImages.has(s.file.replace(/\.\w+$/, "")) ? "In place" : "Awaiting"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
