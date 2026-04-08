import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Imprint | Dama Venus" },
  description: "Legal imprint information for the official Dama Venus website.",
  alternates: {
    canonical: "/imprint"
  }
};

export default function ImprintPage() {
  return (
    <div className="site-container py-20 pb-28">
      <section className="section-stack-md max-w-2xl" aria-labelledby="imprint-title">
        <h1
          id="imprint-title"
          className="text-primary"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 300,
            lineHeight: 0.95
          }}
        >
          Imprint
        </h1>
        <p className="typo-body-m">
          Placeholder page: final imprint details will be added after legal confirmation.
        </p>
      </section>
    </div>
  );
}
