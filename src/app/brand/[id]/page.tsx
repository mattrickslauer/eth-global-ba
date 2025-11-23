"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { AuthButton } from "@coinbase/cdp-react/components/AuthButton";
import { useIsSignedIn } from "@coinbase/cdp-hooks";
import { getTeamById } from "@/data/teams";

type BrandPageProps = {
  params: {
    id: string;
  };
};

export default function BrandPage(props: BrandPageProps) {
  const { isSignedIn, isLoading } = useIsSignedIn();
  const team = getTeamById(props.params.id);

  if (isLoading) {
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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardInner}>
            <p className={styles.eyebrow}>Socios Brand Space</p>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{team.name}</h1>
              <span className={styles.chip}>{team.sport}</span>
            </div>
            <p className={styles.meta}>
              {team.city}, {team.country}
            </p>
            <p className={styles.tagline}>{team.tagline}</p>
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


