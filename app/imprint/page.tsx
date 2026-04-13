import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Imprint | Dáma Venus" },
  description: "Legal imprint and responsible party information for the official Dáma Venus website.",
  alternates: { canonical: "/imprint" }
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

const infoLine = {
  ...bodyText,
  marginBottom: "0.15rem"
};

export default function ImprintPage() {
  return (
    <div className="site-container py-20 pb-28">
      <article className="max-w-2xl" aria-labelledby="imprint-title">

        <header className="mb-16">
          <p style={{ ...sectionHeading, marginBottom: "0.75rem" }}>Legal</p>
          <h1
            id="imprint-title"
            className="text-primary"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 300,
              lineHeight: 0.95
            }}
          >
            Imprint
          </h1>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          {/* Responsible Party */}
          <section>
            <h2 style={sectionHeading}>Information pursuant to § 5 TMG</h2>
            <p style={infoLine}>Tamiris Bittencourt da Silva Brasil</p>
            <p style={infoLine}>Av. Mem de Sá 9</p>
            <p style={infoLine}>Centro, Rio de Janeiro</p>
            <p style={infoLine}>Brazil</p>
          </section>

          {/* Contact */}
          <section>
            <h2 style={sectionHeading}>Contact</h2>
            <p style={infoLine}>
              Email:{" "}
              <a
                href="mailto:contact@damavenus.eu"
                className="text-offWhite hover:text-accent no-underline"
                style={{ transition: "color 250ms" }}
              >
                contact@damavenus.eu
              </a>
            </p>
            <p style={infoLine}>
              Website:{" "}
              <a
                href="https://damavenus.eu"
                className="text-offWhite hover:text-accent no-underline"
                style={{ transition: "color 250ms" }}
              >
                damavenus.eu
              </a>
            </p>
          </section>

          {/* Responsible for Content */}
          <section>
            <h2 style={sectionHeading}>Responsible for Content (§ 18 Abs. 2 MStV)</h2>
            <p style={infoLine}>Tamiris Bittencourt da Silva Brasil</p>
            <p style={infoLine}>Av. Mem de Sá 9</p>
            <p style={infoLine}>Centro, Rio de Janeiro, Brazil</p>
          </section>

          {/* EU Dispute Resolution */}
          <section>
            <h2 style={sectionHeading}>EU Online Dispute Resolution</h2>
            <p style={bodyText}>
              The European Commission provides an online dispute resolution platform at{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-offWhite hover:text-accent no-underline"
                style={{ transition: "color 250ms" }}
              >
                ec.europa.eu/consumers/odr
              </a>
              . We are neither willing nor obliged to participate in dispute resolution proceedings
              before a consumer arbitration board.
            </p>
          </section>

          {/* Liability for Content */}
          <section>
            <h2 style={sectionHeading}>Liability for Content</h2>
            <p style={bodyText}>
              The contents of our pages have been created with the utmost care. However, we cannot
              guarantee the accuracy, completeness, or timeliness of the content. As a service
              provider, we are responsible for our own content on these pages in accordance with
              general laws. However, we are not obligated to monitor transmitted or stored
              third-party information or to investigate circumstances that indicate illegal activity.
              Obligations to remove or block the use of information under general law remain
              unaffected. Liability in this regard is only possible from the time of knowledge of
              a concrete legal violation. Upon becoming aware of such violations, we will remove
              the content immediately.
            </p>
          </section>

          {/* Liability for Links */}
          <section>
            <h2 style={sectionHeading}>Liability for Links</h2>
            <p style={bodyText}>
              Our website contains links to external third-party websites, over whose content we
              have no influence. Therefore, we cannot accept any liability for this external
              content. The respective provider or operator of the linked pages is always responsible
              for the content of the linked pages. The linked pages were checked for possible legal
              violations at the time of linking. Illegal content was not identifiable at the time
              of linking. Permanent monitoring of the content of linked pages is not reasonable
              without concrete evidence of a legal violation. Upon becoming aware of such
              violations, we will remove the relevant links immediately.
            </p>
          </section>

          {/* Copyright */}
          <section>
            <h2 style={sectionHeading}>Copyright</h2>
            <p style={bodyText}>
              The content and works created by the site operator on these pages are subject to
              copyright law. Reproduction, editing, distribution, and any kind of use beyond the
              limits of copyright law require the written consent of the respective author or
              creator. Downloads and copies of this site are only permitted for private,
              non-commercial use. Insofar as the content on this site was not created by the
              operator, the copyrights of third parties are respected. Should you become aware
              of any copyright infringement, please inform us accordingly. Upon becoming aware
              of such violations, we will remove the relevant content immediately.
            </p>
          </section>

          {/* Privacy Reference */}
          <section>
            <h2 style={sectionHeading}>Data Protection</h2>
            <p style={bodyText}>
              For information on how we process your personal data, please refer to our{" "}
              <a
                href="/privacy"
                className="text-offWhite hover:text-accent no-underline"
                style={{ transition: "color 250ms" }}
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

        </div>
      </article>
    </div>
  );
}
