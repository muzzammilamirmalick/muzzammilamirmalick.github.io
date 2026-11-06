// The slim navigation bar that stays at the top of the page.
import { navLinks, profile } from "../../data/content.js";
import "./Nav.css";

export default function Nav() {
  return (
    <header className="nav">
      <a className="nav-name" href="#top">
        {profile.name}
      </a>
      <nav aria-label="Main">
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
