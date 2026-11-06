// The top of the app. It puts the navigation bar, every section and the toast area on the page.
import { Toaster } from "sonner";
import Nav from "./components/layout/Nav.jsx";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Projects from "./components/sections/Projects.jsx";
import Experience from "./components/sections/Experience.jsx";
import Skills from "./components/sections/Skills.jsx";
import Certifications from "./components/sections/Certifications.jsx";
import Contact from "./components/sections/Contact.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Toaster
        position="bottom-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "var(--surface)",
            border: "1px solid var(--amber)",
            color: "var(--amber)",
            fontFamily: "var(--font-mono)",
          },
        }}
      />
    </>
  );
}
