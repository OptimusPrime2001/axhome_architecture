"use client";

import type { ContactFaqItem } from "@shared-types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import styles from "./ContactFaqSection.module.scss";

export interface ContactFaqListProps {
  items: ContactFaqItem[];
}

export const ContactFaqList: React.FC<ContactFaqListProps> = ({ items }) => {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    items.map((item) => item.id),
  );

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className={styles.faqList}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ""}`}
          >
            <button
              type="button"
              className={styles.faqTrigger}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-content`}
            >
              <span className={styles.faqQuestion}>{item.question}</span>
              <ChevronDown
                size={18}
                className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                aria-hidden="true"
              />
            </button>

            <div
              id={`${item.id}-content`}
              className={`${styles.faqBody} ${isOpen ? styles.faqBodyOpen : ""}`}
            >
              <div className={styles.faqAnswerInner}>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
