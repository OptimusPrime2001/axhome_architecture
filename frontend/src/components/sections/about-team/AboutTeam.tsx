import {
  Container,
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@components";
import { ABOUT_TEAM_HEADER, ABOUT_TEAM_MEMBERS } from "@constants";
import Image from "next/image";
import type React from "react";
import styles from "./AboutTeam.module.scss";

export const AboutTeam: React.FC = () => {
  return (
    <section className={styles.section} aria-labelledby="about-team-heading">
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <p className={styles.eyebrow}>{ABOUT_TEAM_HEADER.eyebrow}</p>
              <h2 id="about-team-heading" className={styles.title}>
                {ABOUT_TEAM_HEADER.title}
              </h2>
            </div>
            <p className={styles.lead}>{ABOUT_TEAM_HEADER.description}</p>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.grid}>
          {ABOUT_TEAM_MEMBERS.map((member) => (
            <StaggerItem key={member.id} className={styles.card}>
              <div className={styles.avatarWrapper}>
                <Image
                  src={member.avatarUrl}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={styles.avatar}
                  unoptimized
                />
              </div>

              <div className={styles.body}>
                <div className={styles.bodyTop}>
                  <p className={styles.role}>{member.role}</p>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.bio}>{member.bio}</p>
                </div>

                <div className={styles.credentialRow}>
                  <span className={styles.credentialDot} aria-hidden="true" />
                  <span>{member.credential}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
