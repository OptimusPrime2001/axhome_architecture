import { AnimateIcon } from "@animate-ui/react/icons";
import { Container } from "@components";
import { COMPANY_INFO, WHY_CHOOSE_ITEMS } from "@constants";
import type { WhyChooseItem } from "@shared-types";
import type React from "react";
import { BadgeCheck } from "@/components/animate-ui/icons/badge-check";
import { Compass } from "@/components/animate-ui/icons/compass";
import { ShieldCheck } from "@/components/animate-ui/icons/shield-check";
import { Users } from "@/components/animate-ui/icons/users";
import styles from "./WhyChooseUs.module.scss";

const PILLAR_ICONS: Record<WhyChooseItem["icon"], React.ReactNode> = {
  precision: <Compass size={22} />,
  cost: <BadgeCheck size={22} />,
  team: <Users size={22} />,
  support: <ShieldCheck size={22} />,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="why-choose-heading"
    >
      <Container>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Cam kết cốt lõi</p>
          <h2 id="why-choose-heading" className={styles.title}>
            Vì sao khách hàng chọn {COMPANY_INFO.brandName}
          </h2>
          <p className={styles.lead}>
            Chúng tôi xóa bỏ mọi âu lo trong quá trình xây nhà bằng tiêu chuẩn
            kỹ thuật minh bạch và cam kết trách nhiệm tối thượng.
          </p>
        </div>

        <ul className={styles.pillars}>
          {WHY_CHOOSE_ITEMS.map((item) => (
            <li key={item.id} className={styles.pillar}>
              <AnimateIcon
                animateOnHover
                className={styles.iconBox}
                aria-hidden="true"
              >
                {PILLAR_ICONS[item.icon]}
              </AnimateIcon>
              <h3 className={styles.pillarTitle}>{item.title}</h3>
              <p className={styles.pillarDescription}>{item.description}</p>
              <p className={styles.stat}>{item.stat}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
