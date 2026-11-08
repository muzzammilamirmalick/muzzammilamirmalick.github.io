// Builds the content of Simple view (simple.html) as plain HTML from content.js.
// vite.config.js runs this, so the finished page needs no JavaScript in the browser.
import {
  about,
  certifications,
  detailing,
  education,
  experience,
  journey,
  profile,
  projects,
  skills,
} from "../data/content.js";

// Makes text safe to put inside HTML, so "Click & Collect" doesn't break the page.
function escape(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const list = (items, render) => items.map(render).join("\n");

function renderProject(project) {
  return `<li>
    <h3>${escape(project.name)} <span class="status">${escape(project.status)}</span></h3>
    <p>${escape(project.description)}</p>
    <p class="meta">${escape(project.tech.join(", "))}</p>
  </li>`;
}

function renderJob(job) {
  const place = job.location ? `, ${escape(job.location)}` : "";
  return `<li>
    <h3>${escape(job.role)}, ${escape(job.company)}</h3>
    <p class="meta">${escape(job.period)}${place}</p>
    ${job.points ? `<ul class="points">${list(job.points, (point) => `<li>${escape(point)}</li>`)}</ul>` : ""}
  </li>`;
}

function renderSkill(skill) {
  const learning = skill.learning.length
    ? `<p class="meta">Learning: ${escape(skill.learning.join(", "))}</p>`
    : "";
  return `<li>
    <h3>${escape(skill.group)}</h3>
    <p>${escape(skill.items.join(", "))}</p>
    ${learning}
  </li>`;
}

function renderCertification(cert) {
  const date = cert.date ? ` ${escape(cert.date)}` : "";
  return `<li>${escape(cert.name)} <span class="status">${escape(cert.status)}${date}</span></li>`;
}

export function renderSimplePage() {
  return `<header>
  <h1>${escape(profile.name)}</h1>
  <p>${escape(profile.role)}</p>
  <p class="highlight">${escape(profile.availability)}</p>
  <ul class="links">
    <li><a href="mailto:${escape(profile.email)}">${escape(profile.email)}</a></li>
    <li><a href="${escape(profile.linkedin)}">LinkedIn</a></li>
    <li><a href="${escape(profile.github)}">GitHub</a></li>
    ${profile.resume ? `<li><a href="${escape(profile.resume)}" download>Download resume</a></li>` : ""}
  </ul>
  <p><a href="/">Open the full MuzzOS experience</a></p>
</header>
<main>
  <section>
    <h2>About</h2>
    ${list(about, (paragraph) => `<p>${escape(paragraph)}</p>`)}
  </section>
  <section>
    <h2>Journey</h2>
    <ul class="stack">
      ${list(journey, (stop) => `<li><strong>${escape(stop.when)}:</strong> ${escape(stop.title)}.${stop.detail ? ` ${escape(stop.detail)}` : ""}</li>`)}
    </ul>
  </section>
  <section>
    <h2>Projects</h2>
    <ul class="stack">${list(projects, renderProject)}</ul>
  </section>
  <section>
    <h2>Experience</h2>
    <ul class="stack">${list(experience, renderJob)}</ul>
    <h2>Education</h2>
    <ul class="stack">
      ${list(education, (item) => `<li><h3>${escape(item.school)}</h3><p>${escape(item.program)}</p><p class="meta">${escape(item.period)}</p></li>`)}
    </ul>
  </section>
  <section>
    <h2>${escape(detailing.name)}</h2>
    <p>${escape(detailing.tagline)}</p>
    <ol class="points">${list(detailing.story, (step) => `<li>${escape(step.text)}</li>`)}</ol>
    <p>About 1,000 cars detailed and 100+ customers, including businesses and dealerships on monthly retainers. Started in 2022 in the GTA.</p>
    <p>Services: ${escape(detailing.services.map((service) => service.name).join(", "))}.</p>
    <p><a href="${escape(detailing.instagram)}">${escape(detailing.name)} on Instagram</a></p>
  </section>
  <section>
    <h2>Skills</h2>
    <ul class="stack">${list(skills, renderSkill)}</ul>
  </section>
  <section>
    <h2>Certifications</h2>
    <ul class="stack">${list(certifications, renderCertification)}</ul>
  </section>
  <section>
    <h2>Contact</h2>
    <p><a href="mailto:${escape(profile.email)}">${escape(profile.email)}</a></p>
  </section>
</main>`;
}
