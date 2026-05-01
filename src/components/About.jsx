import useInView from "../hooks/useInView";
import ImagePlaceholder from "./ui/ImagePlaceholder";
import SectionLabel from "./ui/SectionLabel";
import SectionTitle from "./ui/SectionTitle";

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" ref={ref} style={{ padding: "120px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <SectionLabel>About Me</SectionLabel>
          <SectionTitle>
            A Story Rooted
            <br />
            <em style={{ fontStyle: "italic" }}>in Ambition</em>
          </SectionTitle>
          <div style={{ width: 60, height: 1, background: "var(--white)", margin: "28px 0" }} />
          <p style={{ color: "var(--grey-mid)", lineHeight: 1.9, fontSize: "0.95rem", marginBottom: 20 }}>
            Born and raised in Toronto, Ontario, I built my foundation in the arts, sciences, and the relentless pursuit of precision — earning a place in the prestigious{' '}
            <strong style={{ color: "var(--white)" }}>Westmount Arts Program</strong> and developing a deep passion for music through the{' '}
            <strong style={{ color: "var(--white)" }}>Royal Conservatory of Music</strong>.
          </p>
          <p style={{ color: "var(--grey-mid)", lineHeight: 1.9, fontSize: "0.95rem", marginBottom: 20 }}>
            Relocating from Toronto to South Florida wasn't just a change in geography — it was a test of adaptability. Armed with charisma and drive, I forged new connections in a new city, built a career trajectory in dentistry, and never slowed down.
          </p>
          <p style={{ color: "var(--grey-mid)", lineHeight: 1.9, fontSize: "0.95rem" }}>
            Today, I'm one semester away from completing my <strong style={{ color: "var(--white)" }}>Bachelor of Science at Florida Atlantic University</strong>, helping manage one of South Florida's fastest-growing dental labs, and applying artistic and mechanical sensibility to everything I do.
          </p>
        </div>

        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
          }}
        >
          <div style={{ height: 360, marginBottom: 24 }}>
            <ImagePlaceholder src="/PortfolioImages/Piano.png" label="Gil at the Piano" style={{ height: "100%" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--grey-dark)" }}>
            {[
              { n: "B.Sc.", d: "Florida Atlantic University" },
              { n: "RCM", d: "Royal Conservatory of Music" },
              { n: "1000+", d: "Dental shadowing hours" },
              { n: "Toronto", d: "→ Boca Raton, FL" },
            ].map((item, index) => (
              <div key={index} style={{ background: "var(--black)", padding: "24px 20px" }}>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    fontWeight: 300,
                    color: "var(--white)",
                    marginBottom: 4,
                  }}
                >
                  {item.n}
                </p>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--grey-mid)" }}>
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
