import useInView from "../hooks/useInView";
import ImagePlaceholder from "./ui/ImagePlaceholder";
import SectionLabel from "./ui/SectionLabel";
import SectionTitle from "./ui/SectionTitle";

export default function Projects() {
  const [ref, inView] = useInView();

  return (
    <section id="projects" ref={ref} style={{ padding: "120px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel>Projects</SectionLabel>
        <SectionTitle style={{ marginBottom: 60 }}>
          Built by Hand,
          <br />
          <em style={{ fontStyle: "italic" }}>Driven by Passion</em>
        </SectionTitle>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <div
            className="hover-lift"
            style={{
              background: "var(--grey-dark)",
              padding: "48px 40px",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(40px)",
              transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            <div style={{ height: 240, marginBottom: 28 }}>
              <ImagePlaceholder src="/PortfolioImages/IMG_6970.jpg" label="Project Car Photo" style={{ height: "100%" }} />
            </div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 8 }}>
              Mechanical Engineering · Ongoing
            </p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--white)", marginBottom: 16 }}>
              The Engine Swap Project
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--grey-mid)", lineHeight: 1.8, marginBottom: 24 }}>
              A full engine swap undertaken from the ground up — requiring mastery of mechanical systems, sourcing, fabrication, and tenacious problem solving. Every challenge on this build mirrors the methodical thinking demanded in dental practice: diagnose the problem, understand the system, execute with precision.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {['Engine Removal', 'Custom Mounts', 'Wiring Harness', 'Tuning'].map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="hover-lift"
            style={{
              background: "var(--black)",
              border: "1px solid var(--grey-dark)",
              padding: "48px 40px",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(40px)",
              transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s",
            }}
          >
            <div style={{ height: 320, marginBottom: 28 }}>
              <ImagePlaceholder
                src="/PortfolioImages/Painting2.jpg"
                label="Painting 2"
                style={{ height: "100%" }}
                imgStyle={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>

            <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 8 }}>
              Visual Arts · Ongoing
            </p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--white)", marginBottom: 16 }}>
              Art Portfolio
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--grey-mid)", lineHeight: 1.8, marginBottom: 24 }}>
              Painting has been a lifelong pursuit, honed through the Westmount Arts Program and continued as a personal practice. The same steady hand and eye for form developed at the canvas applies to every prosthetic restoration and every clinical procedure.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {['Acrylic', 'Oil', 'Mixed Media', 'Portraiture'].map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
