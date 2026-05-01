import { useState } from "react";
import useInView from "../hooks/useInView";
import ImagePlaceholder from "./ui/ImagePlaceholder";
import SectionLabel from "./ui/SectionLabel";
import SectionTitle from "./ui/SectionTitle";

export default function Portfolio() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(null);

  return (
    <section id="portfolio" ref={ref} style={{ padding: "80px 0 120px" }}>
      <div
        style={{
          padding: "0 48px",
          marginBottom: 60,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.9s ease",
        }}
      >
        <SectionLabel>Portfolio</SectionLabel>
        <SectionTitle>
          Accomplishments
          <br />
          <em style={{ fontStyle: "italic" }}>& Milestones</em>
        </SectionTitle>
        <p style={{ color: "var(--grey-mid)", marginTop: 16, fontSize: "0.85rem" }}>Click a panel to explore</p>
      </div>

      <div className="split-grid" style={{ minHeight: 600 }}>
        <div
          className="portfolio-card"
          onClick={() => setActive(active === "academic" ? null : "academic")}
          style={{
            background: active === "academic" ? "var(--grey-dark)" : "var(--grey-dark)",
            borderRight: "1px solid var(--grey-dark)",
            padding: "60px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 24, right: 24, width: 48, height: 48, border: "1px solid var(--grey-mid)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--grey-mid)" strokeWidth="1.5">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>

          <SectionLabel>Panel 01</SectionLabel>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "var(--white)", marginBottom: 32 }}>
            Academic
            <br />
            <em>Accomplishments</em>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ borderLeft: "1px solid var(--white)", paddingLeft: 20 }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 6 }}>
                Florida Atlantic University
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: 8 }}>
                Bachelor of Science
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--grey-mid)", lineHeight: 1.7 }}>
                One semester from graduation. Pre-dental track with a foundation in biology, chemistry, and health sciences. Committed to academic excellence alongside a full professional schedule.
              </p>
            </div>

            <div style={{ borderLeft: "1px solid var(--grey-mid)", paddingLeft: 20 }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 6 }}>
                Royal Conservatory of Music · Toronto, Canada
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: 8 }}>
                Music Degree — Piano
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--grey-mid)", lineHeight: 1.7 }}>
                Earned a formal degree from one of North America's most respected music institutions. Demonstrates discipline, fine motor precision, and a deep appreciation for structured practice — qualities that translate directly into dentistry.
              </p>
            </div>

            <div style={{ height: 180 }}>
              <ImagePlaceholder src="/PortfolioImages/Piano.png" label="Piano / RCM Photo" style={{ height: "100%" }} />
            </div>
          </div>
        </div>

        <div
          className="portfolio-card"
          onClick={() => setActive(active === "personal" ? null : "personal")}
          style={{
            background: "var(--black)",
            padding: "60px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 24, right: 24, width: 48, height: 48, border: "1px solid var(--grey-mid)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--grey-mid)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>

          <SectionLabel>Panel 02</SectionLabel>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "var(--white)", marginBottom: 32 }}>
            Personal
            <br />
            <em>Accomplishments</em>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ borderLeft: "1px solid var(--white)", paddingLeft: 20 }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 6 }}>
                Westmount Arts Program · Ontario
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: 8 }}>
                Competitive Arts Admission
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--grey-mid)", lineHeight: 1.7 }}>
                Selected into one of Ontario's most competitive visual and performing arts programs — a testament to creative ability and technical execution at a high level.
              </p>
            </div>

            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 12 }}>
                Painting Portfolio
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, height: 240 }}>
                <ImagePlaceholder
                  src="/PortfolioImages/Painting2.jpg"
                  label="Painting 2"
                  style={{ height: "100%", minHeight: 0 }}
                />
                <ImagePlaceholder
                  src="/PortfolioImages/Car picutre.png"
                  label="Painting 3"
                  style={{ height: "100%", minHeight: 0 }}
                />
              </div>
            </div>

            <div style={{ borderLeft: "1px solid var(--grey-mid)", paddingLeft: 20 }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 6 }}>
                Project Car
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: 8 }}>
                Engine Swap Build
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--grey-mid)", lineHeight: 1.7 }}>
                Currently mid-way through a full engine swap — a project that demands mechanical precision, problem solving, and patience. The same toolkit a future dentist needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
