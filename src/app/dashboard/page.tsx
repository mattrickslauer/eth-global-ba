"use client";

import { useState } from "react";
import { useIsSignedIn } from "@coinbase/cdp-hooks";
import styles from "./page.module.css";

type Network = "chiliz" | "base" | "polygon";

type TokenLaunchDraft = {
  name: string;
  symbol: string;
  description: string;
  logoUrl: string;
  totalSupply: string;
  decimals: string;
};

type RwDropPointDraft = {
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  visibility: string;
  clues: string[];
};

type ActiveTab = "token" | "drop";

export default function DashboardPage() {
  const { isSignedIn } = useIsSignedIn();
  const [network, setNetwork] = useState<Network>("chiliz");
  const [activeTab, setActiveTab] = useState<ActiveTab>("token");
  const [tokenDraft, setTokenDraft] = useState<TokenLaunchDraft>({
    name: "",
    symbol: "",
    description: "",
    logoUrl: "",
    totalSupply: "",
    decimals: "18",
  });
  const [dropDraft, setDropDraft] = useState<RwDropPointDraft>({
    name: "",
    description: "",
    imageUrl: "",
    location: "",
    visibility: "region",
    clues: [""],
  });
  const [isReviewing, setIsReviewing] = useState(false);

  if (!isSignedIn) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.titleBlock}>
            <div className={styles.pill}>Sponsor dashboard</div>
            <h1 className={styles.title}>Sign in to launch your fan token campaigns</h1>
            <p className={styles.subtitle}>
              Use your Coinbase-powered embedded wallet to configure token launches and real-world NFT drop points
              across Chiliz, Base, and Polygon.
            </p>
          </div>
        </main>
      </div>
    );
  }

  function handleTokenChange<K extends keyof TokenLaunchDraft>(key: K, value: TokenLaunchDraft[K]) {
    setTokenDraft(function (prev) {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleDropChange<K extends keyof RwDropPointDraft>(key: K, value: RwDropPointDraft[K]) {
    setDropDraft(function (prev) {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleClueChange(index: number, value: string) {
    setDropDraft(function (prev) {
      const nextClues = prev.clues.slice();
      nextClues[index] = value;
      return {
        ...prev,
        clues: nextClues,
      };
    });
  }

  function handleAddClue() {
    setDropDraft(function (prev) {
      return {
        ...prev,
        clues: prev.clues.concat(""),
      };
    });
  }

  function handleRemoveClue(index: number) {
    setDropDraft(function (prev) {
      const nextClues = prev.clues.slice();
      nextClues.splice(index, 1);
      if (nextClues.length === 0) {
        nextClues.push("");
      }
      return {
        ...prev,
        clues: nextClues,
      };
    });
  }

  function handleSaveDraft() {
    setIsReviewing(false);
  }

  function handleContinueToReview() {
    setIsReviewing(true);
  }

  function formatNetworkLabel(value: Network) {
    if (value === "chiliz") {
      return "Chiliz Chain";
    }
    if (value === "base") {
      return "Base";
    }
    return "Polygon";
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.headerRow}>
          <div className={styles.titleBlock}>
            <div className={styles.pill}>Sponsor dashboard</div>
            <h1 className={styles.title}>Launch fan tokens and hidden NFT drops</h1>
            <p className={styles.subtitle}>
              Configure token launches and real-world drop points that connect your club with fans across Chiliz,
              Base, and Polygon. Everything here is design-only for now, ready for onchain wiring.
            </p>
            <div className={styles.tabs}>
              <button
                type="button"
                className={activeTab === "token" ? styles.tabActive : styles.tab}
                onClick={function () {
                  setActiveTab("token");
                  setIsReviewing(false);
                }}
              >
                Token launch
              </button>
              <button
                type="button"
                className={activeTab === "drop" ? styles.tabActive : styles.tab}
                onClick={function () {
                  setActiveTab("drop");
                  setIsReviewing(false);
                }}
              >
                RW Drop Point
              </button>
            </div>
          </div>
          <div className={styles.networkSelector}>
            <div className={styles.networkLabel}>Campaign network</div>
            <div className={styles.networkSelectRow}>
              <select
                className={styles.networkSelect}
                value={network}
                onChange={function (event) {
                  setNetwork(event.target.value as Network);
                }}
              >
                <option value="chiliz">Chiliz Chain</option>
                <option value="base">Base</option>
                <option value="polygon">Polygon</option>
              </select>
            </div>
            <div className={styles.networkHelper}>
              Chiliz is optimized for sports and fan engagement and is fully EVM-compatible. Base and Polygon are
              supported as additional networks for your campaigns.
            </div>
          </div>
        </div>
        {activeTab === "token" ? (
          <div className={styles.content}>
            <section className={styles.panel}>
              <div className={styles.panelTitleRow}>
                <div>
                  <div className={styles.panelTag}>Token launch</div>
                  <h2 className={styles.panelTitle}>Configure your fan token</h2>
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="token-name">
                      Token name
                    </label>
                    <input
                      id="token-name"
                      className={styles.input}
                      value={tokenDraft.name}
                      onChange={function (event) {
                        handleTokenChange("name", event.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="token-symbol">
                      Symbol
                    </label>
                    <input
                      id="token-symbol"
                      className={styles.input}
                      value={tokenDraft.symbol}
                      onChange={function (event) {
                        handleTokenChange("symbol", event.target.value.toUpperCase());
                      }}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <div className={styles.labelRow}>
                    <label className={styles.label} htmlFor="token-description">
                      Narrative
                    </label>
                    <span className={styles.labelHint}>Why this token exists for your fans</span>
                  </div>
                  <textarea
                    id="token-description"
                    className={styles.textarea}
                    value={tokenDraft.description}
                    onChange={function (event) {
                      handleTokenChange("description", event.target.value);
                    }}
                  />
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <div className={styles.labelRow}>
                      <label className={styles.label} htmlFor="token-logo">
                        Logo URL
                      </label>
                      <span className={styles.labelHint}>Use a square image for best results</span>
                    </div>
                    <input
                      id="token-logo"
                      className={styles.input}
                      value={tokenDraft.logoUrl}
                      onChange={function (event) {
                        handleTokenChange("logoUrl", event.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.field}>
                    <div className={styles.labelRow}>
                      <label className={styles.label} htmlFor="token-supply">
                        Total supply
                      </label>
                      <span className={styles.labelHint}>Fungible units across all holders</span>
                    </div>
                    <input
                      id="token-supply"
                      className={styles.input}
                      value={tokenDraft.totalSupply}
                      onChange={function (event) {
                        handleTokenChange("totalSupply", event.target.value.replace(/[^0-9]/g, ""));
                      }}
                    />
                  </div>
                  <div className={styles.field}>
                    <div className={styles.labelRow}>
                      <label className={styles.label} htmlFor="token-decimals">
                        Decimals
                      </label>
                      <span className={styles.labelHint}>Most ERC-20 tokens use 18</span>
                    </div>
                    <input
                      id="token-decimals"
                      className={styles.input}
                      value={tokenDraft.decimals}
                      onChange={function (event) {
                        handleTokenChange("decimals", event.target.value.replace(/[^0-9]/g, ""));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.actionsRow}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={function () {
                    handleSaveDraft();
                  }}
                >
                  Save draft
                </button>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={function () {
                    handleContinueToReview();
                  }}
                >
                  Continue to review
                </button>
              </div>
              <div className={styles.reviewSection}>
                <div className={styles.reviewNote}>
                  This flow is UI-only today. On launch, this step will deploy your token to {formatNetworkLabel(network)}.
                </div>
                {isReviewing ? (
                  <div className={styles.reviewGrid}>
                    <div>
                      <div className={styles.reviewItemLabel}>Token</div>
                      <div className={styles.reviewItemValue}>
                        {tokenDraft.name || "Unnamed token"} {tokenDraft.symbol ? "(" + tokenDraft.symbol + ")" : ""}
                      </div>
                    </div>
                    <div>
                      <div className={styles.reviewItemLabel}>Network</div>
                      <div className={styles.reviewItemValue}>{formatNetworkLabel(network)}</div>
                    </div>
                    <div>
                      <div className={styles.reviewItemLabel}>Supply</div>
                      <div className={styles.reviewItemValue}>
                        {tokenDraft.totalSupply ? tokenDraft.totalSupply : "Not set yet"}
                      </div>
                    </div>
                    <div>
                      <div className={styles.reviewItemLabel}>Estimated cost</div>
                      <div className={styles.reviewItemValue}>Gas estimate will appear here once onchain is wired</div>
                    </div>
                  </div>
                ) : null}
                <button className={styles.reviewLaunchButton} type="button" disabled>
                  Launch (coming soon)
                </button>
              </div>
            </section>
            <aside className={styles.panel}>
              <div className={styles.previewHeader}>
                <div>
                  <div className={styles.panelTag}>Preview</div>
                  <h2 className={styles.panelTitle}>Fan-facing token card</h2>
                </div>
                <div className={styles.previewBadge}>{formatNetworkLabel(network)}</div>
              </div>
              <div className={styles.previewBody}>
                <div className={styles.previewTitle}>
                  {tokenDraft.name || "Your club token"}{" "}
                  {tokenDraft.symbol ? "(" + tokenDraft.symbol + ")" : "(SYM)"}
                </div>
                <div className={styles.previewMeta}>
                  {tokenDraft.description || "Describe what fans unlock when they hold this token."}
                </div>
                <div className={styles.previewMeta}>
                  Supply: {tokenDraft.totalSupply || "set a total supply"} · Decimals:{" "}
                  {tokenDraft.decimals || "18"}
                </div>
                <div className={styles.previewMeta}>
                  Logo preview: {tokenDraft.logoUrl ? tokenDraft.logoUrl : "add a logo URL to brand this token"}
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className={styles.content}>
            <section className={styles.panel}>
              <div className={styles.panelTitleRow}>
                <div>
                  <div className={styles.panelTag}>RW Drop Point</div>
                  <h2 className={styles.panelTitle}>Design your hidden location drop</h2>
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="drop-name">
                      Drop name
                    </label>
                    <input
                      id="drop-name"
                      className={styles.input}
                      value={dropDraft.name}
                      onChange={function (event) {
                        handleDropChange("name", event.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="drop-image">
                      Image URL
                    </label>
                    <input
                      id="drop-image"
                      className={styles.input}
                      value={dropDraft.imageUrl}
                      onChange={function (event) {
                        handleDropChange("imageUrl", event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <div className={styles.labelRow}>
                    <label className={styles.label} htmlFor="drop-description">
                      Story
                    </label>
                    <span className={styles.labelHint}>What happens when a fan finds this drop</span>
                  </div>
                  <textarea
                    id="drop-description"
                    className={styles.textarea}
                    value={dropDraft.description}
                    onChange={function (event) {
                      handleDropChange("description", event.target.value);
                    }}
                  />
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <div className={styles.labelRow}>
                      <label className={styles.label} htmlFor="drop-location">
                        Location hint
                      </label>
                      <span className={styles.labelHint}>City, stadium or GPS-style text</span>
                    </div>
                    <input
                      id="drop-location"
                      className={styles.input}
                      value={dropDraft.location}
                      onChange={function (event) {
                        handleDropChange("location", event.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="drop-visibility">
                      Visibility mode
                    </label>
                    <select
                      id="drop-visibility"
                      className={styles.input}
                      value={dropDraft.visibility}
                      onChange={function (event) {
                        handleDropChange("visibility", event.target.value);
                      }}
                    >
                      <option value="region">Region only (blurred map)</option>
                      <option value="city">City-level</option>
                      <option value="exact">Exact location</option>
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <div className={styles.labelRow}>
                    <label className={styles.label}>Clues</label>
                    <span className={styles.labelHint}>Give fans a path to discovering the drop</span>
                  </div>
                  <div className={styles.cluesList}>
                    {dropDraft.clues.map(function (clue, index) {
                      return (
                        <div className={styles.clueRow} key={index}>
                          <div className={styles.clueIndex}>{index + 1}.</div>
                          <input
                            className={styles.input + " " + styles.clueInput}
                            value={clue}
                            onChange={function (event) {
                              handleClueChange(index, event.target.value);
                            }}
                          />
                          <button
                            type="button"
                            className={styles.ghostButton}
                            onClick={function () {
                              handleRemoveClue(index);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={function () {
                        handleAddClue();
                      }}
                    >
                      Add clue
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.actionsRow}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={function () {
                    handleSaveDraft();
                  }}
                >
                  Save draft
                </button>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={function () {
                    handleContinueToReview();
                  }}
                >
                  Continue to review
                </button>
              </div>
              <div className={styles.reviewSection}>
                <div className={styles.reviewNote}>
                  This flow is UI-only today. On launch, this step will mint NFTs and guard the hidden coordinates on{" "}
                  {formatNetworkLabel(network)}.
                </div>
                {isReviewing ? (
                  <div className={styles.reviewGrid}>
                    <div>
                      <div className={styles.reviewItemLabel}>Drop</div>
                      <div className={styles.reviewItemValue}>{dropDraft.name || "Untitled drop"}</div>
                    </div>
                    <div>
                      <div className={styles.reviewItemLabel}>Network</div>
                      <div className={styles.reviewItemValue}>{formatNetworkLabel(network)}</div>
                    </div>
                    <div>
                      <div className={styles.reviewItemLabel}>Location</div>
                      <div className={styles.reviewItemValue}>
                        {dropDraft.location || "Add a location hint to anchor this drop"}
                      </div>
                    </div>
                    <div>
                      <div className={styles.reviewItemLabel}>Clues</div>
                      <div className={styles.reviewItemValue}>
                        {dropDraft.clues.filter(function (clue) {
                          return clue.trim().length > 0;
                        }).length || 0}{" "}
                        clues configured
                      </div>
                    </div>
                  </div>
                ) : null}
                <button className={styles.reviewLaunchButton} type="button" disabled>
                  Launch (coming soon)
                </button>
              </div>
            </section>
            <aside className={styles.panel}>
              <div className={styles.previewHeader}>
                <div>
                  <div className={styles.panelTag}>Preview</div>
                  <h2 className={styles.panelTitle}>Player view of a hidden drop</h2>
                </div>
                <div className={styles.previewBadge}>{formatNetworkLabel(network)}</div>
              </div>
              <div className={styles.playerCard}>
                <div className={styles.playerTitle}>{dropDraft.name || "Mystery matchday drop"}</div>
                <div className={styles.playerSubtitle}>
                  {dropDraft.description || "Fans race to discover a hidden location and claim a limited NFT."}
                </div>
                <div className={styles.playerMetaRow}>
                  <span>{dropDraft.location || "Location hidden"}</span>
                  <span>
                    Visibility:{" "}
                    {dropDraft.visibility === "exact"
                      ? "Exact"
                      : dropDraft.visibility === "city"
                      ? "City"
                      : "Region only"}
                  </span>
                </div>
                <div className={styles.blurBlock} />
                <div className={styles.playerClues}>
                  <div className={styles.playerClueLabel}>First clue</div>
                  <div className={styles.playerClueText}>
                    {dropDraft.clues.find(function (clue) {
                      return clue.trim().length > 0;
                    }) || "Your first clue will appear here for fans."}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}




