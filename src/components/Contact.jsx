import { useState } from "react";
import useInView from "../hooks/useInView";
import SectionLabel from "./ui/SectionLabel";
import SectionTitle from "./ui/SectionTitle";

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" ref={ref} style={{ padding: "120px 48px", background: "var(--grey-dark)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div style={{ opacity: inView ? 1 : 0, transition: "all 0.9s ease" }}>
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>
            Let's Talk
            <br />
            <em style={{ fontStyle: "italic" }}>Dentistry</em>
          </SectionTitle>
          <div style={{ width: 40, height: 1, background: "var(--white)", margin: "28px 0" }} />
          <p style={{ color: "var(--grey-mid)", lineHeight: 1.9, fontSize: "0.9rem", marginBottom: 40 }}>
            Whether you're a dental school admissions office, a professional in the field, or someone curious about my work — I'd love to connect.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "✉", label: "Email", val: "Gusinskygil@gmail.com" },
              { icon: "☎", label: "Phone", val: "561-419-5534" },
              { icon: "📍", label: "Location", val: "Boca Raton, Florida" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <span style={{ fontSize: "1rem", color: "var(--grey-mid)", marginTop: 2 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 4 }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "var(--white)" }}>{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.9s ease 0.2s" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--white)", marginBottom: 12 }}>
                Message Sent.
              </p>
              <p style={{ color: "var(--grey-mid)", fontSize: "0.85rem" }}>Thank you for reaching out. I'll be in touch shortly.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {['name', 'email'].map((field) => (
                <div key={field}>
                  <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 8 }}>
                    {field}
                  </label>
                  <input
                    className="contact-input"
                    type={field === 'email' ? 'email' : 'text'}
                    value={form[field]}
                    onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                    placeholder={field === 'name' ? 'Your full name' : 'your@email.com'}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--grey-mid)", marginBottom: 8 }}>
                  Message
                </label>
                <textarea
                  className="contact-input"
                  rows={4}
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  placeholder="Say hello..."
                  style={{ resize: "none", borderBottom: "1px solid var(--grey-dark)" }}
                />
              </div>
              <button
                className="split-btn"
                style={{ alignSelf: "flex-start", marginTop: 8 }}
                onClick={() => {
                  if (form.name && form.email && form.message) {
                    setSent(true);
                  }
                }}
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
