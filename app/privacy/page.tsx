import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Dáma Venus" },
  description: "Privacy policy for the official Dáma Venus website — data protection information pursuant to GDPR and LGPD.",
  alternates: { canonical: "/privacy" }
};

const sectionHeading = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "rgba(200,168,126,0.8)",
  marginBottom: "1rem"
};

const bodyText = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.85rem",
  lineHeight: 1.75,
  color: "rgba(245,240,235,0.6)"
};

const subHeading = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "rgba(245,240,235,0.8)",
  marginTop: "1.5rem",
  marginBottom: "0.5rem"
};

export default function PrivacyPage() {
  return (
    <div className="site-container py-20 pb-28">
      <article className="max-w-2xl" aria-labelledby="privacy-title">

        <header className="mb-16">
          <p style={{ ...sectionHeading, marginBottom: "0.75rem" }}>Legal</p>
          <h1
            id="privacy-title"
            className="text-primary"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 300,
              lineHeight: 0.95
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ ...bodyText, marginTop: "1rem" }}>
            Last updated: April 2026
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          {/* 1 — Controller */}
          <section>
            <h2 style={sectionHeading}>1. Data Controller</h2>
            <p style={bodyText}>
              The data controller responsible for this website is Tamiris Bittencourt da Silva Brasil,
              Av. Mem de Sá 9, Centro, Rio de Janeiro, Brazil. Contact: contact@damavenus.eu
            </p>
          </section>

          {/* 2 — Overview */}
          <section>
            <h2 style={sectionHeading}>2. Overview</h2>
            <p style={bodyText}>
              This privacy policy explains how we collect, use, and protect personal data when you
              visit damavenus.eu. We are committed to protecting your privacy in accordance with the
              EU General Data Protection Regulation (GDPR), the Brazilian General Data Protection
              Law (LGPD — Lei Geral de Proteção de Dados), and other applicable data protection
              legislation.
            </p>
          </section>

          {/* 3 — Data Collection */}
          <section>
            <h2 style={sectionHeading}>3. Data We Collect</h2>

            <h3 style={subHeading}>3.1 Automatically Collected Data</h3>
            <p style={bodyText}>
              When you visit our website, our hosting provider may automatically collect technical
              data including your IP address (anonymized), browser type and version, operating system,
              referring URL, date and time of access, and pages visited. This data is processed on the
              basis of legitimate interest (Art. 6(1)(f) GDPR) to ensure the security and functionality
              of the website.
            </p>

            <h3 style={subHeading}>3.2 Contact Form</h3>
            <p style={bodyText}>
              If you use our contact form, we collect your name, email address, and the content of
              your message. This data is processed on the basis of your consent (Art. 6(1)(a) GDPR)
              and for the purpose of responding to your inquiry. Your data will be deleted once the
              inquiry has been fully resolved, unless legal retention obligations apply.
            </p>

            <h3 style={subHeading}>3.3 No Cookies or Tracking</h3>
            <p style={bodyText}>
              This website does not use cookies for tracking or analytics purposes. We do not use
              any third-party analytics tools, advertising trackers, or social media tracking pixels.
              Technically necessary data (such as server logs) is processed solely to ensure the
              proper functioning of the website.
            </p>
          </section>

          {/* 4 — Purpose and Legal Basis */}
          <section>
            <h2 style={sectionHeading}>4. Purpose and Legal Basis</h2>
            <p style={bodyText}>
              We process personal data exclusively for the following purposes: operating and securing
              the website (legitimate interest, Art. 6(1)(f) GDPR), responding to inquiries submitted
              through our contact form (consent, Art. 6(1)(a) GDPR), and fulfilling legal obligations
              where applicable (Art. 6(1)(c) GDPR).
            </p>
          </section>

          {/* 5 — Third-Party Services */}
          <section>
            <h2 style={sectionHeading}>5. Third-Party Services</h2>

            <h3 style={subHeading}>5.1 Hosting</h3>
            <p style={bodyText}>
              This website is hosted on a virtual private server. The hosting provider may process
              server log data as a data processor on our behalf. A data processing agreement is in
              place in accordance with Art. 28 GDPR.
            </p>

            <h3 style={subHeading}>5.2 Embedded Content</h3>
            <p style={bodyText}>
              Our website may embed content from third-party platforms such as Spotify and YouTube.
              When you interact with embedded content, these providers may collect data in accordance
              with their own privacy policies. We recommend reviewing the privacy policies of
              Spotify (spotify.com/privacy) and Google/YouTube (policies.google.com/privacy).
            </p>

            <h3 style={subHeading}>5.3 External Links</h3>
            <p style={bodyText}>
              Our website contains links to external platforms including Instagram, LinkedIn, and
              Filmmakers.eu. These links open in a new browser tab. We have no control over the
              data processing practices of these external services.
            </p>
          </section>

          {/* 6 — Data Transfer */}
          <section>
            <h2 style={sectionHeading}>6. International Data Transfers</h2>
            <p style={bodyText}>
              As the data controller is based in Brazil and the website serves an international
              audience, personal data may be transferred between Brazil and the European Economic
              Area. Such transfers are carried out in compliance with applicable data protection
              regulations, including the use of appropriate safeguards where required (Art. 46 GDPR).
            </p>
          </section>

          {/* 7 — Your Rights */}
          <section>
            <h2 style={sectionHeading}>7. Your Rights</h2>
            <p style={bodyText}>
              Under the GDPR and LGPD, you have the right to access, rectification, erasure,
              restriction of processing, data portability, and objection to the processing of your
              personal data. You also have the right to withdraw consent at any time without
              affecting the lawfulness of processing carried out prior to withdrawal. To exercise
              any of these rights, please contact us at contact@damavenus.eu. You also have the
              right to lodge a complaint with a supervisory authority, in particular in the EU
              member state of your habitual residence or in Brazil with the Autoridade Nacional
              de Proteção de Dados (ANPD).
            </p>
          </section>

          {/* 8 — Data Retention */}
          <section>
            <h2 style={sectionHeading}>8. Data Retention</h2>
            <p style={bodyText}>
              We retain personal data only for as long as necessary to fulfill the purposes for
              which it was collected, or as required by applicable law. Contact form data is deleted
              once the inquiry has been resolved. Server log data is automatically deleted after
              30 days.
            </p>
          </section>

          {/* 9 — Security */}
          <section>
            <h2 style={sectionHeading}>9. Data Security</h2>
            <p style={bodyText}>
              We implement appropriate technical and organizational measures to protect your
              personal data against unauthorized access, alteration, disclosure, or destruction.
              All data transmitted to and from this website is encrypted using TLS/SSL technology.
            </p>
          </section>

          {/* 10 — Minors */}
          <section>
            <h2 style={sectionHeading}>10. Children&apos;s Privacy</h2>
            <p style={bodyText}>
              This website is not directed at children under the age of 16. We do not knowingly
              collect personal data from children. If you believe that a child has provided us
              with personal data, please contact us so that we can delete such information.
            </p>
          </section>

          {/* 11 — Changes */}
          <section>
            <h2 style={sectionHeading}>11. Changes to This Policy</h2>
            <p style={bodyText}>
              We reserve the right to update this privacy policy to reflect changes in our
              practices or applicable law. The current version will always be available on this page
              with the date of the last update indicated above.
            </p>
          </section>

          {/* 12 — Contact */}
          <section>
            <h2 style={sectionHeading}>12. Contact</h2>
            <p style={bodyText}>
              For any questions regarding this privacy policy or your personal data, please contact
              us at: contact@damavenus.eu
            </p>
          </section>

        </div>
      </article>
    </div>
  );
}
