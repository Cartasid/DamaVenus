import type { Metadata } from "next";
import Link from "next/link";
import RecordingPlayer from "@/components/fyc/recording-player";
import { fycData } from "@/content/data/fyc.data";
import styles from "./fyc.module.css";

const title = "Dama Venus | For Your Grammy® Consideration & Sync Portal";
const description = "Official independent media gateway for Dama Venus Productions. High-fidelity audio assets, metadata clearance matrices, and registry compliance.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/fyc" },
  openGraph: {
    title,
    description,
    url: "/fyc",
    type: "website",
    images: [{ url: fycData.artwork, width: 2400, height: 1350, alt: "Dama Venus — Kitsune Pt 2, For Your GRAMMY® Consideration" }]
  },
  twitter: { card: "summary_large_image", title, description, images: [fycData.artwork] }
};

export default function FycPage() {
  return (
    <article className={styles.page} aria-labelledby="fyc-title">
      <header className={styles.intro}>
        <div className={styles.masthead}>
          <h1 id="fyc-title">FOR YOUR GRAMMY® CONSIDERATION</h1>
          <span className={styles.micro}>Dama Venus Productions</span>
        </div>
        <div className={styles.titleRow}>
          <div>
            <p className={styles.artist}>{fycData.artist}</p>
            <h2 className={styles.trackTitle}>Kitsune <span>Pt 2</span></h2>
          </div>
          <a className={styles.listenLink} href="#listen">Listen to the recording <span aria-hidden="true">↓</span></a>
        </div>

        <dl className={styles.entryData}>
          <div><dt>Track title / Artist</dt><dd>{fycData.title} / {fycData.artist}</dd></div>
          <div><dt>Category</dt><dd>{fycData.category}</dd></div>
          <div><dt>Entry number</dt><dd className={styles.number}>{fycData.entryNumber}</dd></div>
          <div><dt>Web ID</dt><dd className={styles.number}>{fycData.webId}</dd></div>
        </dl>
      </header>

      <RecordingPlayer />

      <section className={styles.recordingNotes} aria-labelledby="recording-notes-title">
        <div>
          <p className={styles.micro}>02 / The recording</p>
          <h2 id="recording-notes-title">Desire. Connection.<br />After midnight.</h2>
        </div>
        <div className={styles.notesBody}>
          <p>{fycData.description}</p>
          <p>For Recording Academy voting members considering Best Rap Performance: listen to the first-person delivery and the return of the refrain within that nocturnal setting.</p>
          <blockquote>“no drama, no stress”<cite>Recurring refrain · Kitsune Pt 2</cite></blockquote>
        </div>
      </section>

      <section className={styles.credentials} aria-labelledby="credentials-title">
        <div className={styles.sectionHeader}>
          <h2 id="credentials-title">Technical sync credentials</h2>
          <span className={styles.micro}>03 / Rights &amp; contact</span>
        </div>
        <dl className={styles.rightsData}>
          <div><dt>Clearance status</dt><dd>{fycData.clearance}</dd></div>
          <div><dt>Performing Rights Organization (PRO)</dt><dd>{fycData.pro}</dd></div>
          <div><dt>Base hub</dt><dd>{fycData.base}</dd></div>
        </dl>
        <div className={styles.contactRow}>
          <p>Questions about the recording, credits or sync licensing?<br />Contact Dama Venus Productions directly.</p>
          <a className={styles.contactButton} href={`mailto:${fycData.contact}?subject=Kitsune%20Pt%202%20%E2%80%94%20recording%20enquiry`}>Contact Dama Venus Productions <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <div className={styles.colophon}>
        <p>Independent artist FYC presentation. This page does not announce a GRAMMY nomination or imply Recording Academy endorsement.</p>
        <p>To opt out of further FYC communications, email <a href={`mailto:${fycData.contact}?subject=STOP%20FYC`}>{fycData.contact}</a> with the subject “STOP FYC”.</p>
        <Link href="/music">Explore the music <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
