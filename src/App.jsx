import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Skills from "./components/Skills/Skills.jsx";
import Contact from "./components/Contact/Contact.jsx";
import GlowParticles from "./components/GlowParticles.jsx";
import useScrollSnap from "./useScrollSnap";
import "./App.css";

function App() {
  useScrollSnap();

  return (
    <>
      <GlowParticles />

      <div className="app-container">
        <Navbar />
        <main className="sections-container">
          <Hero />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </>
  );
}

export default App;
