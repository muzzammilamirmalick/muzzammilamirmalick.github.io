// Skills as short labels instead of sentences, with anything being learned drawn differently.
import { skills } from "../data/content.js";
import Icon from "../components/ui/Icon.jsx";
import "./SkillsApp.css";

const groupIcons = { Software: "terminal", Hardware: "skills", Tools: "wrench" };

export default function SkillsApp() {
  return (
    <div className="app-pad skills">
      {skills.map((skill) => (
        <section className="skill-group" key={skill.group}>
          <h2 className="skill-group-name">
            <Icon name={groupIcons[skill.group] ?? "spark"} size={18} />
            {skill.group}
          </h2>
          <ul className="skill-chips">
            {skill.items.map((item) => (
              <li className="skill-chip" key={item}>
                {item}
              </li>
            ))}
            {skill.learning.map((item) => (
              <li className="skill-chip skill-chip-learning" key={item}>
                Learning: {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
