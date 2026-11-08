// My detailing business, styled like a small brand page of its own.
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import BeforeAfterSlider from "../components/ui/BeforeAfterSlider.jsx";
import Icon from "../components/ui/Icon.jsx";
import StatTiles from "../components/ui/StatTiles.jsx";
import { detailing } from "../data/content.js";
import "./DetailingApp.css";

const EASE_OUT = [0.22, 1, 0.36, 1];

function Story() {
  const reducedMotion = useReducedMotion();

  return (
    <ol className="dt-story">
      {detailing.story.map((step, index) => (
        <motion.li
          className="dt-step"
          key={step.title}
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          // The first steps follow quickly, then the last one lands with a little more weight.
          transition={{ duration: 0.4, delay: 0.12 + index * 0.16, ease: EASE_OUT }}
        >
          <span className="dt-step-number" aria-hidden="true">
            {index + 1}
          </span>
          <Icon name={step.icon} size={26} />
          <h3 className="dt-step-title">{step.title}</h3>
          <p className="dt-step-text">{step.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}

// Buttons to pick a before and after pair, with the slider and a caption below.
function Results() {
  const [index, setIndex] = useState(0);
  const pair = detailing.beforeAfter[index];

  return (
    <>
      <div className="dt-pairs">
        {detailing.beforeAfter.map((item, i) => (
          <button
            type="button"
            className="btn dt-pair"
            key={item.label}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <figure className="dt-figure">
        {/* The key resets the slider to the middle when the pair changes. */}
        <BeforeAfterSlider key={pair.label} {...pair} />
        <figcaption className="dt-caption">{pair.caption}</figcaption>
      </figure>
    </>
  );
}

export default function DetailingApp() {
  return (
    <div className="dt">
      <div className="dt-hero">
        <div>
          <h2 className="dt-name">{detailing.name}</h2>
          <p className="dt-tagline">{detailing.tagline}</p>
        </div>
        <a className="btn dt-instagram" href={detailing.instagram} target="_blank" rel="noreferrer">
          <Icon name="instagram" size={18} />
          Instagram
        </a>
      </div>

      <StatTiles stats={detailing.stats} />

      <section aria-labelledby="dt-story">
        <h3 className="dt-heading" id="dt-story">
          How it grew
        </h3>
        <Story />
      </section>

      <section aria-labelledby="dt-services">
        <h3 className="dt-heading" id="dt-services">
          Services
        </h3>
        <ul className="dt-services">
          {detailing.services.map((service) => (
            <li className="dt-service" key={service.name}>
              <Icon name={service.icon} size={24} />
              {service.name}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="dt-results">
        <h3 className="dt-heading" id="dt-results">
          Before and after
        </h3>
        <Results />
      </section>

      <aside className="dt-soon">
        <span className="dt-soon-tag">Coming soon</span>
        <h3 className="dt-soon-title">{detailing.comingSoon.title}</h3>
        <p className="dt-soon-text">{detailing.comingSoon.text}</p>
      </aside>
    </div>
  );
}
