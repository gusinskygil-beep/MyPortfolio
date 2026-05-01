import { useState } from "react";

export default function ImagePlaceholder({ label, src, style = {}, imgStyle = {} }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="img-placeholder" style={{ width: "100%", height: "100%", minHeight: 180, position: "relative", overflow: "hidden", ...style }}>
      {src && !failed ? (
        <img
          src={src}
          alt={label}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", ...imgStyle }}
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="1" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </div>
  );
}
