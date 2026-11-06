// The Skills section: one row per group, with anything still being learned shown under it.
import { skills } from "../../data/content.js";
import SectionHeading from "../layout/SectionHeading.jsx";
import "./Skills.css";

export default function Skills() {
  return (
    <section className="section" aria-labelledby="skills">
      <SectionHeading id="skills">Skills</SectionHeading>
      <div className="skill-groups">
        {skills.map((skill) => (
          <div className="skill-group" key={skill.group}>
            <h3 className="skill-name">{skill.group}</h3>
            <div>
              <p>{skill.items.join(", ")}</p>
              {skill.learning.length > 0 && (
                <p className="skill-learning">Learning: {skill.learning.join(", ")}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
