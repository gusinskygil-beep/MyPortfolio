export default function SectionTitle({ children, style = {} }) {
  return (
    <h2
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
        lineHeight: 1.1,
        color: "var(--white)",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}
