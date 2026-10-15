import type { Metadata } from "next";
import RecordingPlayer from "@/components/fyc/recording-player";
import { fycData } from "@/content/data/fyc.data";
import styles from "./fyc.module.css";

const title = fycData.metadataTitle;
const description = fycData.metadataDescription;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [fycData.artist, fycData.title, fycData.category, "For Your GRAMMY® Consideration"],
  authors: [{ name: fycData.artist }],
  creator: fycData.artist,
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
          <a className={styles.optOutLink} href={fycData.optOutUrl}>FYC opt-out</a>
        </div>
        <div className={styles.titleRow}>
          <div>
            <p className={styles.artist}>{fycData.artist}</p>
            <h2 className={styles.trackTitle}>Kitsune <span>Pt 2</span></h2>
          </div>
          <a className={styles.listenLink} href="#listen">Recording <span aria-hidden="true">↓</span></a>
        </div>

        <dl className={styles.entryData}>
          <div><dt>Recording</dt><dd>{fycData.title}</dd></div>
          <div><dt>Artist</dt><dd>{fycData.artist}</dd></div>
          <div><dt>Category</dt><dd>{fycData.category}</dd></div>
        </dl>
      </header>

      <RecordingPlayer />

      <section className={styles.recordingNotes} aria-labelledby="recording-notes-title">
        <div>
          <h2 id="recording-notes-title">About the recording</h2>
        </div>
        <div className={styles.notesBody}>
          <p>{fycData.description}</p>
        </div>
      </section>

      <section className={styles.colophon} aria-labelledby="fyc-information-title">
        <h2 id="fyc-information-title">FYC information</h2>
        <p><a href={fycData.guidelinesUrl} target="_blank" rel="noopener noreferrer">Recording Academy voting and solicitation guidelines<span className="sr-only"> (new tab)</span></a></p>
        <p>To opt out of further FYC communications, email <a href={fycData.optOutUrl}>{fycData.contact}</a> with the subject “STOP FYC”.</p>
        <a className={styles.optOutButton} href={fycData.optOutUrl}>Opt out of FYC communications</a>
      </section>
    </article>
  );
}
