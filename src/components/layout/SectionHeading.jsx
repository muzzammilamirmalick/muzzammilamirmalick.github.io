// The heading at the top of each section.
import "./SectionHeading.css";

export default function SectionHeading({ id, children }) {
  return (
    <h2 className="section-heading" id={id}>
      <span className="section-heading-prompt" aria-hidden="true">
        &gt;{" "}
      </span>
      {children}
    </h2>
  );
}
