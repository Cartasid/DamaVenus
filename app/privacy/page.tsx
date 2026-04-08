import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Privacy | Dama Venus" },
  description: "Privacy notice for the official Dama Venus website.",
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPage() {
  return (
    <div className="site-container py-20 pb-28">
      <section className="section-stack-md max-w-2xl" aria-labelledby="privacy-title">
        <h1
          id="privacy-title"
          className="text-primary"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 300,
            lineHeight: 0.95
          }}
        >
          Privacy Policy
        </h1>
        <p className="typo-body-m">
          Placeholder page: final privacy content will be added after legal review.
        </p>
      </section>
    </div>
  );
}
