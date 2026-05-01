export default function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontSize: "0.7rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--grey-mid)",
        marginBottom: "12px",
      }}
    >
      {children}
    </p>
  );
}
