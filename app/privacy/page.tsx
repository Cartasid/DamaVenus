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
    <section className="section-stack-md" aria-labelledby="privacy-title">
      <h1 id="privacy-title" className="typo-h1 font-bold">
        Privacy Policy
      </h1>
      <p className="typo-body-m max-w-2xl">
        Placeholder page: final privacy content will be added after legal review.
      </p>
    </section>
  );
}
