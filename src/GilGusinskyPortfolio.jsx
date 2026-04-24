import { useState, useEffect, useRef } from "react";

// ── Fonts via Google Fonts ──────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// ── Global Styles ───────────────────────────────────────────────────────────
const globalStyles = `
  :root {
    --black: #0a0a0a;
    --white: #f5f5f0;
    --grey-light: #e8e8e3;
    --grey-mid: #9a9a90;
    --grey-dark: #2a2a2a;
    --accent: #c8c8be;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--black); color: var(--white); font-family: 'Outfit', sans-serif; overflow-x: hidden; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes grain {
    0%,100%{ transform: translate(0,0); }
    10%{ transform: translate(-2%,-3%); }
    20%{ transform: translate(3%,2%); }
    30%{ transform: translate(-1%,4%); }
    40%{ transform: translate(4%,-1%); }
    50%{ transform: translate(-3%,3%); }
    60%{ transform: translate(2%,-4%); }
    70%{ transform: translate(-4%,1%); }
    80%{ transform: translate(1%,-2%); }
    90%{ transform: translate(-2%,4%); }
  }

  .animate-fade-up { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
  .animate-fade-in { animation: fadeIn 1.2s ease both; }

  .grain-overlay::after {
    content: '';
    position: fixed;
    inset: -200%;
    width: 400%;
    height: 400%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 9999;
    animation: grain 8s steps(10) infinite;
  }

  .section-line {
    display: block;
    height: 1px;
    background: var(--white);
    transform-origin: left;
    animation: slideRight 1s cubic-bezier(0.22,1,0.36,1) both;
  }

  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }

  .nav-link {
    position: relative;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--grey-mid);
    transition: color 0.3s ease;
    text-decoration: none;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: var(--white);
    transition: width 0.3s ease;
  }
  .nav-link:hover { color: var(--white); }
  .nav-link:hover::after { width: 100%; }

  .img-placeholder {
    background: var(--grey-dark);
    border: 1px dashed var(--grey-mid);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--grey-mid);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    gap: 8px;
  }

  .split-btn {
    position: relative;
    overflow: hidden;
    background: transparent;
    border: 1px solid var(--grey-mid);
    color: var(--white);
    cursor: pointer;
    transition: border-color 0.3s ease, color 0.3s ease;
    font-family: 'Outfit', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 12px 28px;
  }
  .split-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--white);
    transform: translateX(-101%);
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    z-index: 0;
  }
  .split-btn:hover::before { transform: translateX(0); }
  .split-btn:hover { color: var(--black); border-color: var(--white); }
  .split-btn span { position: relative; z-index: 1; }

  .skill-tag {
    border: 1px solid var(--grey-dark);
    padding: 6px 14px;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--grey-mid);
    transition: all 0.3s ease;
  }
  .skill-tag:hover { border-color: var(--white); color: var(--white); }

  .timeline-dot {
    width: 10px; height: 10px;
    border: 1px solid var(--white);
    border-radius: 50%;
    background: var(--black);
    flex-shrink: 0;
    margin-top: 6px;
    position: relative;
    transition: background 0.3s ease;
  }
  .timeline-item:hover .timeline-dot { background: var(--white); }

  .contact-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--grey-dark);
    color: var(--white);
    font-family: 'Outfit', sans-serif;
    font-size: 0.9rem;
    padding: 12px 0;
    width: 100%;
    outline: none;
    transition: border-color 0.3s ease;
  }
  .contact-input:focus { border-color: var(--white); }
  .contact-input::placeholder { color: var(--grey-mid); }

  .portfolio-card {
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    cursor: pointer;
  }
  .portfolio-card:hover { background: var(--grey-dark) !important; }

  .marquee-track { animation: marquee 18s linear infinite; white-space: nowrap; }
  .marquee-track:hover { animation-play-state: paused; }

  @media (max-width: 768px) {
    .split-grid { grid-template-columns: 1fr !important; }
    .hero-title { font-size: clamp(3rem, 12vw, 6rem) !important; }
  }
`;

const styleEl = document.createElement("style");
styleEl.textContent = globalStyles;
document.head.appendChild(styleEl);

// ── Scroll-triggered visibility hook ───────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: "12px" }}>
      {children}
    </p>
  );
}
function SectionTitle({ children, style = {} }) {
  return (
    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem,4vw,3.5rem)", lineHeight: 1.1, color: "var(--white)", ...style }}>
      {children}
    </h2>
  );
}
function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid var(--grey-dark)", margin: "0" }} />;
}
function ImagePlaceholder({ label, style = {} }) {
  return (
    <div className="img-placeholder" style={{ width: "100%", height: "100%", minHeight: 180, ...style }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

// ── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "20px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
    }}>
      <a href="#home" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, letterSpacing: "0.06em", color: "var(--white)", textDecoration: "none" }}>
        G · G
      </a>
      <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
        {links.map(l => (
          <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
        ))}
      </div>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [typed, setTyped] = useState("");
  const tagline = "Dental Professional · Technologist · Artist";
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < tagline.length) { setTyped(tagline.slice(0, i + 1)); i++; }
      else clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" style={{ position: "relative", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 80px", overflow: "hidden" }}>
      {/* Background grid lines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--grey-dark) 1px, transparent 1px), linear-gradient(90deg, var(--grey-dark) 1px, transparent 1px)", backgroundSize: "80px 80px", opacity: 0.18, pointerEvents: "none" }} />

      {/* Decorative circle */}
      <div style={{ position: "absolute", top: "12%", right: "8%", width: 320, height: 320, borderRadius: "50%", border: "1px solid var(--grey-dark)", animation: "float 6s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "14%", right: "10%", width: 240, height: 240, borderRadius: "50%", border: "1px solid var(--grey-dark)", animation: "float 8s ease-in-out infinite reverse", pointerEvents: "none" }} />

      {/* Portrait placeholder top-right */}
      <div style={{ position: "absolute", top: "9%", right: "6%", width: 260, height: 320 }}>
        <ImagePlaceholder label="Your Photo" style={{ height: "100%" }} />
      </div>

      {/* Big name */}
      <div style={{ animation: "fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}>
        <p style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: "24px" }}>Portfolio · 2025</p>
        <h1 className="hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(4.5rem, 10vw, 9rem)", lineHeight: 0.9, color: "var(--white)", marginBottom: "32px" }}>
          Gil<br /><em style={{ fontStyle: "italic" }}>Gusinsky</em>
        </h1>
      </div>

      <div style={{ animation: "fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.5s both" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.2rem", color: "var(--grey-mid)", marginBottom: "40px", maxWidth: 480 }}>
          {typed}<span style={{ animation: "cursorBlink 1s infinite", opacity: typed.length < tagline.length ? 1 : 0 }}>|</span>
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button className="split-btn" onClick={() => document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" })}><span>View Portfolio</span></button>
          <button className="split-btn" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}><span>Get In Touch</span></button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "float 2s ease-in-out infinite" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--grey-mid)" }}>Scroll</p>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="var(--grey-mid)" strokeWidth="1">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <circle cx="8" cy="7" r="2" fill="var(--grey-mid)" style={{ animation: "float 1.5s ease-in-out infinite" }} />
        </svg>
      </div>
    </section>
  );
}

// ── MARQUEE BAND ─────────────────────────────────────────────────────────────
function Marquee() {
  const words = ["Dental Laboratory · ", "CAD/CAM · ", "3D Printing · ", "Fine Arts · ", "CNC Milling · ", "FAU · ", "Toronto to Florida · ", "Royal Conservatory · ", "Engine Swap · "];
  const repeated = [...words, ...words];
  return (
    <div style={{ borderTop: "1px solid var(--grey-dark)", borderBottom: "1px solid var(--grey-dark)", overflow: "hidden", padding: "16px 0", background: "var(--grey-dark)" }}>
      <div className="marquee-track" style={{ display: "inline-flex" }}>
        {repeated.map((w, i) => (
          <span key={i} style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--grey-mid)", padding: "0 8px" }}>{w}</span>
        ))}
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: "120px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        {/* Left */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
          <SectionLabel>About Me</SectionLabel>
          <SectionTitle>A Story Rooted<br /><em style={{ fontStyle: "italic" }}>in Ambition</em></SectionTitle>
          <div style={{ width: 60, height: 1, background: "var(--white)", margin: "28px 0" }} />
          <p style={{ color: "var(--grey-mid)", lineHeight: 1.9, fontSize: "0.95rem", marginBottom: 20 }}>
            Born and raised in Toronto, Ontario, I built my foundation in the arts, sciences, and the relentless pursuit of precision — earning a place in the prestigious <strong style={{ color: "var(--white)" }}>Westmount Arts Program</strong> and developing a deep passion for music through the <strong style={{ color: "var(--white)" }}>Royal Conservatory of Music</strong>.
          </p>
          <p style={{ color: "var(--grey-mid)", lineHeight: 1.9, fontSize: "0.95rem", marginBottom: 20 }}>
            Relocating from Toronto to South Florida wasn't just a change in geography — it was a test of adaptability. Armed with charisma and drive, I forged new connections in a new city, built a career trajectory in dentistry, and never slowed down.
          </p>
          <p style={{ color: "var(--grey-mid)", lineHeight: 1.9, fontSize: "0.95rem" }}>
            Today, I'm one semester away from completing my <strong style={{ color: "var(--white)" }}>Bachelor of Science at Florida Atlantic University</strong>, helping manage one of South Florida's fastest-growing dental labs, and applying artistic and mechanical sensibility to everything I do.
          </p>
        </div>

        {/* Right */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s" }}>
          <div style={{ height: 360, marginBottom: 24 }}>
            <ImagePlaceholder label="Gil at the Piano" style={{ height: "100%" }} />
          </div>

          {/* Quick facts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--grey-dark)" }}>
            {[
              { n: "B.Sc.", d: "Florida Atlantic University" },
              { n: "RCM", d: "Royal Conservatory of Music" },
              { n: "1000+", d: "Dental shadowing hours" },
              { n: "Toronto", d: "→ Boca Raton, FL" },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--black)", padding: "24px 20px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--white)", marginBottom: 4 }}>{item.n}</p>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--grey-mid)" }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PORTFOLIO (Split) ─────────────────────────────────────────────────────────
function Portfolio() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(null); // 'academic' | 'personal'

  return (
    <section id="portfolio" ref={ref} style={{ padding: "80px 0 120px" }}>
      {/* Header */}
      <div style={{ padding: "0 48px", marginBottom: 60, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease" }}>
        <SectionLabel>Portfolio</SectionLabel>
        <SectionTitle>Accomplishments<br /><em style={{ fontStyle: "italic" }}>& Milestones</em></SectionTitle>
        <p style={{ color: "var(--grey-mid)", marginTop: 16, fontSize: "0.85rem" }}>Click a panel to explore</p>
      </div>

      {/* Split screen */}
      <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 600 }}>

        {/* Academic */}
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--grey-mid)" strokeWidth="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>

          <SectionLabel>Panel 01</SectionLabel>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "var(--white)", marginBottom: 32 }}>Academic<br /><em>Accomplishments</em></h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* FAU */}
            <div style={{ borderLeft: "1px solid var(--white)", paddingLeft: 20 }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 6 }}>Florida Atlantic University</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: 8 }}>Bachelor of Science</p>
              <p style={{ fontSize: "0.82rem", color: "var(--grey-mid)", lineHeight: 1.7 }}>One semester from graduation. Pre-dental track with a foundation in biology, chemistry, and health sciences. Committed to academic excellence alongside a full professional schedule.</p>
            </div>

            {/* RCM */}
            <div style={{ borderLeft: "1px solid var(--grey-mid)", paddingLeft: 20 }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 6 }}>Royal Conservatory of Music · Toronto, Canada</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: 8 }}>Music Degree — Piano</p>
              <p style={{ fontSize: "0.82rem", color: "var(--grey-mid)", lineHeight: 1.7 }}>Earned a formal degree from one of North America's most respected music institutions. Demonstrates discipline, fine motor precision, and a deep appreciation for structured practice — qualities that translate directly into dentistry.</p>
            </div>

            {/* Piano image */}
            <div style={{ height: 180 }}>
              <ImagePlaceholder label="Piano / RCM Photo" style={{ height: "100%" }} />
            </div>
          </div>
        </div>

        {/* Personal */}
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--grey-mid)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>

          <SectionLabel>Panel 02</SectionLabel>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "var(--white)", marginBottom: 32 }}>Personal<br /><em>Accomplishments</em></h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Westmount Arts */}
            <div style={{ borderLeft: "1px solid var(--white)", paddingLeft: 20 }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 6 }}>Westmount Arts Program · Ontario</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: 8 }}>Competitive Arts Admission</p>
              <p style={{ fontSize: "0.82rem", color: "var(--grey-mid)", lineHeight: 1.7 }}>Selected into one of Ontario's most competitive visual and performing arts programs — a testament to creative ability and technical execution at a high level.</p>
            </div>

            {/* Paintings collage */}
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 12 }}>Painting Portfolio</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, height: 140 }}>
                {["Painting 1", "Painting 2", "Painting 3"].map(l => (
                  <ImagePlaceholder key={l} label={l} style={{ height: "100%", minHeight: 0 }} />
                ))}
              </div>
            </div>

            {/* Car */}
            <div style={{ borderLeft: "1px solid var(--grey-mid)", paddingLeft: 20 }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 6 }}>Project Car</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: 8 }}>Engine Swap Build</p>
              <p style={{ fontSize: "0.82rem", color: "var(--grey-mid)", lineHeight: 1.7 }}>Currently mid-way through a full engine swap — a project that demands mechanical precision, problem solving, and patience. The same toolkit a future dentist needs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
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
          {/* Left sticky heading */}
          <div style={{ opacity: inView ? 1 : 0, transition: "all 0.9s ease" }}>
            <SectionLabel>Experience</SectionLabel>
            <SectionTitle>Where Skill<br /><em style={{ fontStyle: "italic" }}>Meets Practice</em></SectionTitle>
            <div style={{ width: 40, height: 1, background: "var(--white)", margin: "28px 0" }} />

            {/* Skills */}
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 16 }}>Core Skills</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["CAD/CAM Dental Workflows", "Resin 3D Printing", "CNC Milling", "Troubleshooting & Repair", "Lab Operations & QC", "Chairside Dentistry Observation", "Mechanical Problem Solving", "Client & Team Management"].map(s => (
                <div key={s} className="skill-tag" style={{ display: "inline-block" }}>{s}</div>
              ))}
            </div>

            {/* Lab image */}
            <div style={{ height: 200, marginTop: 32 }}>
              <ImagePlaceholder label="Lab Equipment Photo" style={{ height: "100%" }} />
            </div>
          </div>

          {/* Timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {items.map((item, i) => (
              <div key={i} className="timeline-item" style={{ display: "flex", gap: 24, paddingBottom: 48, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `all 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s` }}>
                {/* Timeline line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div className="timeline-dot" />
                  {i < items.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--grey-dark)", marginTop: 8 }} />}
                </div>
                {/* Content */}
                <div style={{ paddingBottom: 8, flex: 1 }}>
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 8 }}>{item.year}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--white)", marginBottom: 4 }}>{item.role}</p>
                  <p style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>{item.org}</p>
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

// ── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" ref={ref} style={{ padding: "120px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel>Projects</SectionLabel>
        <SectionTitle style={{ marginBottom: 60 }}>Built by Hand,<br /><em style={{ fontStyle: "italic" }}>Driven by Passion</em></SectionTitle>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>

          {/* Car project */}
          <div className="hover-lift" style={{ background: "var(--grey-dark)", padding: "48px 40px", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
            <div style={{ height: 240, marginBottom: 28 }}>
              <ImagePlaceholder label="Project Car Photo" style={{ height: "100%" }} />
            </div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 8 }}>Mechanical Engineering · Ongoing</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--white)", marginBottom: 16 }}>The Engine Swap Project</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--grey-mid)", lineHeight: 1.8, marginBottom: 24 }}>
              A full engine swap undertaken from the ground up — requiring mastery of mechanical systems, sourcing, fabrication, and tenacious problem solving. Every challenge on this build mirrors the methodical thinking demanded in dental practice: diagnose the problem, understand the system, execute with precision.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Engine Removal", "Custom Mounts", "Wiring Harness", "Tuning"].map(t => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Art portfolio */}
          <div className="hover-lift" style={{ background: "var(--black)", border: "1px solid var(--grey-dark)", padding: "48px 40px", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, height: 240, marginBottom: 28 }}>
              <ImagePlaceholder label="Painting 1" style={{ height: "100%" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <ImagePlaceholder label="Painting 2" style={{ flex: 1 }} />
                <ImagePlaceholder label="Painting 3" style={{ flex: 1 }} />
              </div>
            </div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 8 }}>Visual Arts · Ongoing</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--white)", marginBottom: 16 }}>Art Portfolio</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--grey-mid)", lineHeight: 1.8, marginBottom: 24 }}>
              Painting has been a lifelong pursuit, honed through the Westmount Arts Program and continued as a personal practice. The same steady hand and eye for form developed at the canvas applies to every prosthetic restoration and every clinical procedure.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Acrylic", "Oil", "Mixed Media", "Portraiture"].map(t => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" ref={ref} style={{ padding: "120px 48px", background: "var(--grey-dark)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

        {/* Left */}
        <div style={{ opacity: inView ? 1 : 0, transition: "all 0.9s ease" }}>
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>Let's Talk<br /><em style={{ fontStyle: "italic" }}>Dentistry</em></SectionTitle>
          <div style={{ width: 40, height: 1, background: "var(--white)", margin: "28px 0" }} />
          <p style={{ color: "var(--grey-mid)", lineHeight: 1.9, fontSize: "0.9rem", marginBottom: 40 }}>
            Whether you're a dental school admissions office, a professional in the field, or someone curious about my work — I'd love to connect.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "✉", label: "Email", val: "Gusinskygil@gmail.com" },
              { icon: "☎", label: "Phone", val: "561-419-5534" },
              { icon: "📍", label: "Location", val: "Boca Raton, Florida" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <span style={{ fontSize: "1rem", color: "var(--grey-mid)", marginTop: 2 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: "0.9rem", color: "var(--white)" }}>{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.9s ease 0.2s" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--white)", marginBottom: 12 }}>Message Sent.</p>
              <p style={{ color: "var(--grey-mid)", fontSize: "0.85rem" }}>Thank you for reaching out. I'll be in touch shortly.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {["name", "email"].map(field => (
                <div key={field}>
                  <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 8 }}>{field}</label>
                  <input
                    className="contact-input"
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                    placeholder={field === "name" ? "Your full name" : "your@email.com"}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 8 }}>Message</label>
                <textarea
                  className="contact-input"
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Say hello..."
                  style={{ resize: "none", borderBottom: "1px solid var(--grey-dark)" }}
                />
              </div>
              <button
                className="split-btn"
                style={{ alignSelf: "flex-start", marginTop: 8 }}
                onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
              >
                <span>Send Message</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--grey-dark)", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--grey-mid)" }}>Gil Gusinsky © 2025</p>
      <p style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--grey-mid)" }}>Future Dental Professional</p>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="grain-overlay" style={{ background: "var(--black)", minHeight: "100vh" }}>
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
  );
}
