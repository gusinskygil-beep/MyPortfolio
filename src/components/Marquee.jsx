export default function Marquee() {
  const words = [
    "Dental Laboratory · ",
    "CAD/CAM · ",
    "3D Printing · ",
    "Fine Arts · ",
    "CNC Milling · ",
    "FAU · ",
    "Toronto to Florida · ",
    "Royal Conservatory · ",
    "Engine Swap · ",
  ];
  const repeated = [...words, ...words];

  return (
    <div
      style={{
        borderTop: "1px solid var(--grey-dark)",
        borderBottom: "1px solid var(--grey-dark)",
        overflow: "hidden",
        padding: "16px 0",
        background: "var(--grey-dark)",
      }}
    >
      <div className="marquee-track" style={{ display: "inline-flex" }}>
        {repeated.map((word, index) => (
          <span
            key={index}
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--grey-mid)",
              padding: "0 8px",
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
