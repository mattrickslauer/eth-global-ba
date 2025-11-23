"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { AuthButton } from "@coinbase/cdp-react";
import { useIsSignedIn } from "@coinbase/cdp-hooks";
import { getTeamById } from "@/data/teams";

type BrandPageProps = {
  params: {
    id: string;
  };
};

export default function BrandPage(props: BrandPageProps) {
  const { isSignedIn, isLoading } = useIsSignedIn();
  const [isClient, setIsClient] = useState(false);
  const [questScheduled, setQuestScheduled] = useState(false);
  const [questStatus, setQuestStatus] = useState("");
  const team = getTeamById(props.params.id);

  useEffect(function () {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.locked}>Loading wallet session</div>
        </main>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <p className={styles.locked}>Sign in with Coinbase to unlock brand universes.</p>
              <div className={styles.actions}>
                <AuthButton />
                <Link href="/" className={styles.backLink}>
                  Back to grid
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!team) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <p className={styles.locked}>Brand not found.</p>
              <div className={styles.actions}>
                <Link href="/" className={styles.backLink}>
                  Back to grid
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  function scheduleNotification() {
    setQuestStatus("Quest clue will be broadcasted soon.");
    setQuestScheduled(true);
    setTimeout(function () {
      try {
        new Notification("Sponsor Quest Clue", {
          body: "Demo clue: watch this sponsor’s feed for a hidden onchain surprise in the next match.",
          tag: "sponsor-quest",
        });
        setQuestStatus("Quest clue broadcasted.");
      } catch (error) {
        setQuestStatus("Quest clue ready: check this sponsor’s space for the hidden hint.");
      }
    }, 10000);
  }

  function handleQuestClick() {
    if (questScheduled) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    if (!("Notification" in window)) {
      setQuestStatus("Quest clue will be shared here soon.");
      setQuestScheduled(true);
      setTimeout(function () {
        setQuestStatus("Quest clue: follow this sponsor’s space for a hidden onchain moment.");
      }, 10000);
      return;
    }

    if (Notification.permission === "granted") {
      scheduleNotification();
      return;
    }

    if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          scheduleNotification();
        } else {
          setQuestStatus("Quest clue will be shared here soon.");
          setQuestScheduled(true);
        }
      });
      return;
    }

    setQuestStatus("Quest clue will be shared here soon.");
    setQuestScheduled(true);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardInner}>
            <div className={styles.brandHeader}>
              <img src={team.logoUrl} alt={team.name} className={styles.brandLogo} />
              <div className={styles.brandHeaderText}>
                <p className={styles.eyebrow}>Socios Brand Space</p>
                <div className={styles.titleRow}>
                  <h1 className={styles.title}>{team.name}</h1>
                  <span className={styles.chip}>{team.sport}</span>
                </div>
                <p className={styles.meta}>
                  {team.city}, {team.country}
                </p>
              </div>
            </div>
            <p className={styles.tagline}>{team.tagline}</p>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Category</span>
              <span className={styles.detailValue}>{team.category}</span>
            </div>
            {team.tokenSymbol && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Token</span>
                <span className={styles.detailValue}>{team.tokenSymbol}</span>
              </div>
            )}
            <div className={styles.actions}>
              <button type="button" className={styles.questButton} onClick={handleQuestClick}>
                Discover Quests from this Sponsor
              </button>
              <Link href="/" className={styles.backLink}>
                Back to grid
              </Link>
            </div>
            {questStatus && <p className={styles.questStatus}>{questStatus}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}


