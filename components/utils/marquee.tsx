"use client";

type Props = {
  items: string[];
  separator?: string;
  speed?: number;
  className?: string;
};

export default function Marquee({
  items,
  separator = " · ",
  speed = 40,
  className = ""
}: Props) {
  const content = items.join(separator) + separator;

  return (
    <div
      className={`marquee-container ${className}`}
      aria-hidden="true"
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.15)"
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "inline-block",
          animation: `marquee-scroll ${speed}s linear infinite`
        }}
      >
        <span>{content}</span>
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}
