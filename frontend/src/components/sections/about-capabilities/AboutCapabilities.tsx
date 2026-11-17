import { CountingNumber } from "@animate-ui/react/primitives/texts/counting-number";
import {
  AnimateHoverItem,
  Blocks,
  Brush,
  Cctv,
  Compass,
  Container,
  Eye,
  Hammer,
  House,
  Leaf,
  ScrollReveal,
  Sparkles,
  StaggerGroup,
  StaggerItem,
  Users,
} from "@components";
import {
  ABOUT_CAPABILITIES_HEADER,
  ABOUT_CAPABILITY_GROUPS,
  ABOUT_CAPABILITY_METRICS,
} from "@constants";
import type React from "react";
import styles from "./AboutCapabilities.module.scss";

const DESIGN_ICONS: React.ReactNode[] = [
  <House key="des-1" size={16} />,
  <Brush key="des-2" size={16} />,
  <Leaf key="des-3" size={16} />,
  <Eye key="des-4" size={16} />,
];

const BUILD_ICONS: React.ReactNode[] = [
  <Blocks key="bld-1" size={16} />,
  <Sparkles key="bld-2" size={16} />,
  <Cctv key="bld-3" size={16} />,
  <Users key="bld-4" size={16} />,
];

export const AboutCapabilities: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-capabilities-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.topRow}>
            <div className={styles.headerCol}>
              <p className={styles.eyebrow}>
                {ABOUT_CAPABILITIES_HEADER.eyebrow}
              </p>
              <h2 id="about-capabilities-heading" className={styles.title}>
                {ABOUT_CAPABILITIES_HEADER.title}
              </h2>
              <p className={styles.lead}>
                {ABOUT_CAPABILITIES_HEADER.description}
              </p>
            </div>

            <div className={styles.metricsGrid}>
              {ABOUT_CAPABILITY_METRICS.map((metric) => (
                <div key={metric.label} className={styles.metricCard}>
                  <span className={styles.metricValue}>
                    <CountingNumber number={metric.value} inView />
                    {metric.suffix}
                  </span>
                  <span className={styles.metricLabel}>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.groupsGrid}>
          {ABOUT_CAPABILITY_GROUPS.map((group) => {
            const isBuild = group.id === "build";
            const icons = isBuild ? BUILD_ICONS : DESIGN_ICONS;

            return (
              <StaggerItem key={group.id}>
                <AnimateHoverItem as="div" className={styles.groupPanel}>
                  <div className={styles.groupHeader}>
                    <span className={styles.groupIcon} aria-hidden="true">
                      {isBuild ? <Hammer size={18} /> : <Compass size={18} />}
                    </span>
                    <div className={styles.groupTitles}>
                      <p className={styles.groupEyebrow}>{group.eyebrow}</p>
                      <h3 className={styles.groupTitle}>{group.title}</h3>
                    </div>
                  </div>

                  <ul className={styles.itemsList}>
                    {group.items.map((item, idx) => (
                      <AnimateHoverItem
                        key={item.id}
                        className={styles.itemCard}
                      >
                        <span className={styles.itemIcon} aria-hidden="true">
                          {icons[idx]}
                        </span>
                        <div className={styles.itemBody}>
                          <h4 className={styles.itemTitle}>{item.title}</h4>
                          <p className={styles.itemDesc}>{item.description}</p>
                        </div>
                      </AnimateHoverItem>
                    ))}
                  </ul>
                </AnimateHoverItem>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
};
