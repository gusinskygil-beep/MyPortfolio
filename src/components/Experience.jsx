import useInView from "../hooks/useInView";
import ImagePlaceholder from "./ui/ImagePlaceholder";
import SectionLabel from "./ui/SectionLabel";
import SectionTitle from "./ui/SectionTitle";

export default function Experience() {
  const [ref, inView] = useInView();
  const items = [
    {
      year: "2022 – Present",
      role: "Laboratory Manager & Equipment Specialist",
      org: "Dreamworks Dental Laboratory · South Florida",
      desc: "Help manage daily operations at one of the fastest-growing dental labs in South Florida. Responsible for servicing, calibrating, and troubleshooting a full suite of digital dentistry equipment including CAD/CAM mills, resin 3D printers, and sintering furnaces. Oversee workflow optimization and quality control for hundreds of restorations monthly.",
    },
    {
      year: "Ongoing",
      role: "Dental Shadowing",
      org: "Various Dental Practices · South Florida",
      desc: "Accumulated extensive chairside hours shadowing dentists across general, cosmetic, and restorative disciplines. Gained insight into diagnosis, treatment planning, patient communication, and the intersection of laboratory work with clinical outcomes.",
    },
    {
      year: "2021 – Present",
      role: "CNC & 3D Print Technician",
      org: "Dental Lab Equipment Specialist",
      desc: "Deep hands-on experience maintaining and repairing precision milling machines (CNC) and resin 3D printers. Proficient in troubleshooting hardware and software faults, material calibration, G-code interpretation, and post-processing of dental prosthetics.",
    },
  ];

  return (
    <section id="experience" ref={ref} style={{ padding: "120px 48px", background: "var(--grey-dark)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div style={{ opacity: inView ? 1 : 0, transition: "all 0.9s ease" }}>
            <SectionLabel>Experience</SectionLabel>
            <SectionTitle>
              Where Skill
              <br />
              <em style={{ fontStyle: "italic" }}>Meets Practice</em>
            </SectionTitle>
            <div style={{ width: 40, height: 1, background: "var(--white)", margin: "28px 0" }} />
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 16 }}>
              Core Skills
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "CAD/CAM Dental Workflows",
                "Resin 3D Printing",
                "CNC Milling",
                "Troubleshooting & Repair",
                "Lab Operations & QC",
                "Chairside Dentistry Observation",
                "Mechanical Problem Solving",
                "Client & Team Management",
              ].map((skill) => (
                <div key={skill} className="skill-tag" style={{ display: "inline-block" }}>
                  {skill}
                </div>
              ))}
            </div>
            <div style={{ height: 200, marginTop: 32 }}>
              <ImagePlaceholder
                src="/PortfolioImages/printers.png"
                label="Lab Equipment Photo"
                style={{ height: "100%" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {items.map((item, index) => (
              <div
                key={index}
                className="timeline-item"
                style={{
                  display: "flex",
                  gap: 24,
                  paddingBottom: 48,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 0.15}s`,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div className="timeline-dot" />
                  {index < items.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--grey-dark)", marginTop: 8 }} />}
                </div>
                <div style={{ paddingBottom: 8, flex: 1 }}>
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 8 }}>
                    {item.year}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--white)", marginBottom: 4 }}>
                    {item.role}
                  </p>
                  <p style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>
                    {item.org}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "var(--grey-mid)", lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
