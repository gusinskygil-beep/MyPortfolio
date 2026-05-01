import "./styles/global.css";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Divider from "./components/ui/Divider";

export default function App() {
  return (
    <div className="grain-overlay" style={{ background: "var(--black)", minHeight: "100vh" }}>
      <div className="app-wrapper">
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Divider />
        <Portfolio />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
