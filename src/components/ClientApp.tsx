"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { AuthButton } from "@coinbase/cdp-react/components/AuthButton";
import { useIsSignedIn } from "@coinbase/cdp-hooks";
import { teams, type BrandCategory } from "@/data/teams";

export default function ClientApp() {
  const { isSignedIn } = useIsSignedIn();
  const [isClient, setIsClient] = useState(false);
  const [activeCategory, setActiveCategory] = useState<BrandCategory>("sports");

  useEffect(function () {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Loading your experience</h1>
          <p className={styles.subtitle}>Preparing your embedded wallet</p>
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.pill}>Powered by Coinbase Embedded Wallets</div>
          <h1 className={styles.title}>Unlock every club in the future of fandom</h1>
          <p className={styles.subtitle}>
            Sign in with Coinbase to explore all Socios partner teams in a living, animated grid of brands.
          </p>
          <div className={styles.actions}>
            <AuthButton />
          </div>
        </div>
      </main>
    );
  }

  const filteredTeams = teams.filter(function (team) {
    return team.category === activeCategory;
  });

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.pill}>All Socios clubs, one interface</div>
        <h1 className={styles.title}>Choose your side in a reactive brand universe</h1>
        <p className={styles.subtitle}>
          Hover, tilt, and tap through the grid to dive into each team&apos;s onchain fan experience.
        </p>
      </div>
      <div className={styles.gridWrapper}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={activeCategory === "sports" ? styles.tabActive : styles.tab}
            onClick={function () {
              setActiveCategory("sports");
            }}
          >
            Sports
          </button>
          <button
            type="button"
            className={activeCategory === "enterprise" ? styles.tabActive : styles.tab}
            onClick={function () {
              setActiveCategory("enterprise");
            }}
          >
            Enterprise
          </button>
          <button
            type="button"
            className={activeCategory === "crypto" ? styles.tabActive : styles.tab}
            onClick={function () {
              setActiveCategory("crypto");
            }}
          >
            Crypto
          </button>
        </div>
        <div className={styles.grid}>
          {filteredTeams.map(function (team) {
            return (
              <Link key={team.id} href={`/brand/${team.id}`} className={styles.card}>
                <div className={styles.cardGlow} />
                <div className={styles.cardInner}>
                  <div className={styles.cardLogoWrapper}>
                    <img src={team.logoUrl} alt={team.name} className={styles.cardLogo} />
                  </div>
                  <div className={styles.badge}>{team.sport}</div>
                  <h2 className={styles.cardTitle}>{team.name}</h2>
                  <p className={styles.cardMeta}>
                    {team.city}, {team.country}
                  </p>
                  <p className={styles.cardTagline}>{team.tagline}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardLink}>Enter brand space</span>
                    <span className={styles.cardArrow}>↗</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}


