"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import styles from "./ProjectDetailHero.module.scss";

export const ShareProjectButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className={styles.shareBtn} onClick={handleShare}>
      {copied ? (
        <Check size={14} aria-hidden="true" />
      ) : (
        <Share2 size={14} aria-hidden="true" />
      )}
      <span>{copied ? "Đã sao chép liên kết" : "Chia sẻ"}</span>
    </button>
  );
};
