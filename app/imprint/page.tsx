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
    <section className="section-stack-md" aria-labelledby="imprint-title">
      <h1 id="imprint-title" className="typo-h1 font-bold">
        Imprint
      </h1>
      <p className="typo-body-m max-w-2xl">
        Placeholder page: final imprint details will be added after legal confirmation.
      </p>
    </section>
  );
}
