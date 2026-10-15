"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fycData } from "@/content/data/fyc.data";
import styles from "@/app/fyc/fyc.module.css";

type Provider = "video" | "spotify" | "amazon";

const providers = {
  video: { name: "YouTube", url: fycData.videoUrl, embed: fycData.videoEmbedUrl },
  spotify: { name: "Spotify", url: fycData.spotifyUrl, embed: fycData.spotifyEmbedUrl },
  amazon: { name: "Amazon Music", url: fycData.amazonUrl, embed: fycData.amazonEmbedUrl }
} as const;

export default function RecordingPlayer() {
  const [provider, setProvider] = useState<Provider>("video");
  const [activated, setActivated] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (activated) frameRef.current?.focus();
  }, [activated, provider]);

  function chooseProvider(next: Provider) {
    // Unmounting the previous iframe stops playback when switching providers.
    setActivated(true);
    setProvider(next);
  }

  const isVideo = provider === "video";
  const selected = providers[provider];

  return (
    <section id="listen" className={styles.listen} aria-labelledby="listen-title">
      <div className={styles.sectionHeader}>
        <h2 id="listen-title">Listen to the recording</h2>
        <span className={styles.micro}>01 / Listen</span>
      </div>

      <div className={styles.player} data-provider={provider} data-active={activated}>
        {activated ? (
          <iframe
            key={provider}
            ref={frameRef}
            className={isVideo ? styles.videoFrame : provider === "spotify" ? styles.spotifyFrame : styles.amazonFrame}
            src={selected.embed}
            title={`Kitsune Pt 2 — Dama Venus on ${selected.name}`}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            <Image
              src={fycData.artwork}
              alt="Dama Venus — Kitsune Pt 2, For Your GRAMMY® Consideration in Best Rap Performance. Campaign artwork with a magenta-lit portrait."
              width={2400}
              height={1350}
              priority
              className={styles.artwork}
            />
            <button type="button" className={styles.playButton} onClick={() => setActivated(true)}>
              <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true"><path d="M1 1v16l14-8z" /></svg>
              <span>Play recording</span>
            </button>
          </>
        )}
      </div>

      <div className={styles.playerControls}>
        <div className={styles.providerButtons} role="group" aria-label="Choose streaming provider">
          <button type="button" aria-pressed={isVideo} onClick={() => chooseProvider("video")}>Video</button>
          <button type="button" aria-pressed={provider === "spotify"} onClick={() => chooseProvider("spotify")}>Spotify</button>
          <button type="button" aria-pressed={provider === "amazon"} onClick={() => chooseProvider("amazon")}>Amazon Music</button>
        </div>
        <a href={selected.url} target="_blank" rel="noopener noreferrer">
          Open on {selected.name} <span aria-hidden="true">↗</span><span className="sr-only"> (new tab)</span>
        </a>
      </div>
      <p className={styles.playerNote}>
        {isVideo
          ? "Play loads YouTube here; the provider buttons load their respective players. Direct links remain available if playback is unavailable."
          : `${selected.name} loads here. Preview length and full-track access depend on the provider, your account and region.`}
        {" "}<a href="/privacy">Privacy</a>
      </p>
      <noscript><p className={styles.playerNote}>Use the direct recording link to listen without JavaScript.</p></noscript>
    </section>
  );
}
