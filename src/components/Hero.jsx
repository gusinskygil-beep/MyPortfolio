import { useEffect, useState } from "react";
import ImagePlaceholder from "./ui/ImagePlaceholder";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const tagline = "Dental Professional · Technologist · Artist";

  useEffect(() => {
    let index = 0;
    const subscription = setInterval(() => {
      if (index < tagline.length) {
        setTyped(tagline.slice(0, index + 1));
        index += 1;
      } else {
        clearInterval(subscription);
      }
    }, 45);

    return () => clearInterval(subscription);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 48px 80px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--grey-dark) 1px, transparent 1px), linear-gradient(90deg, var(--grey-dark) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "12%",
          right: "8%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: "1px solid var(--grey-dark)",
          animation: "float 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "14%",
          right: "10%",
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: "1px solid var(--grey-dark)",
          animation: "float 8s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "absolute", top: "9%", right: "6%", width: 260, height: 320 }}>
        <ImagePlaceholder
          src="/PortfolioImages/Personal Photo.png"
          label="Your Photo"
          style={{ height: "100%" }}
          imgStyle={{ objectPosition: "center 100%" }}
        />
      </div>

      <div style={{ animation: "fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}>
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--grey-mid)",
            marginBottom: "24px",
          }}
        >
          Portfolio · 2025
        </p>
        <h1
          className="hero-title"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(4.5rem, 10vw, 9rem)",
            lineHeight: 0.9,
            color: "var(--white)",
            marginBottom: "32px",
          }}
        >
          Gil
          <br />
          <em style={{ fontStyle: "italic" }}>Gusinsky</em>
        </h1>
      </div>

      <div style={{ animation: "fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.5s both" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1.2rem",
            color: "var(--grey-mid)",
            marginBottom: "40px",
            maxWidth: 480,
          }}
        >
          {typed}
          <span
            style={{
              animation: "cursorBlink 1s infinite",
              opacity: typed.length < tagline.length ? 1 : 0,
            }}
          >
            |
          </span>
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button
            className="split-btn"
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span>View Portfolio</span>
          </button>
          <button
            className="split-btn"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span>Get In Touch</span>
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--grey-mid)",
          }}
        >
          Scroll
        </p>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="var(--grey-mid)" strokeWidth="1">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <circle
            cx="8"
            cy="7"
            r="2"
            fill="var(--grey-mid)"
            style={{ animation: "float 1.5s ease-in-out infinite" }}
          />
        </svg>
      </div>
    </section>
  );
}
