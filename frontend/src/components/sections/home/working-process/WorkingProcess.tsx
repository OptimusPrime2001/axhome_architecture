import {
  AnimateHoverItem,
  ClipboardList,
  Container,
  Hammer,
  Key,
  MapPin,
  MessageSquare,
  ScrollReveal,
  Sparkles,
  StaggerGroup,
  StaggerItem,
} from "@components";
import { WORKING_PROCESS_STEPS } from "@constants";
import type React from "react";
import styles from "./WorkingProcess.module.scss";

const STEP_ICONS: React.ReactNode[] = [
  <MessageSquare key="step-1" size={20} />,
  <MapPin key="step-2" size={20} />,
  <Sparkles key="step-3" size={20} />,
  <ClipboardList key="step-4" size={20} />,
  <Hammer key="step-5" size={20} />,
  <Key key="step-6" size={20} />,
];

export interface WorkingProcessProps {
  id?: string;
}

export const WorkingProcess: React.FC<WorkingProcessProps> = ({ id }) => {
  return (
    <section
      id={id}
      className={styles.section}
      aria-labelledby="working-process-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Quy trình 6 bước</p>
            <h2 id="working-process-heading" className={styles.title}>
              Quy trình làm việc
            </h2>
            <p className={styles.lead}>
              Từ buổi gặp đầu tiên đến khi bàn giao, mỗi công trình đi qua sáu
              bước chặt chẽ với cam kết minh bạch về tiến độ, chi phí và chất
              lượng.
            </p>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.grid}>
          {WORKING_PROCESS_STEPS.map((step, index) => (
            <StaggerItem key={step.id}>
              <AnimateHoverItem as="div" className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.number} aria-hidden="true">
                    {step.number}
                  </span>
                  <span className={styles.iconBox} aria-hidden="true">
                    {STEP_ICONS[index]}
                  </span>
                </div>
                <p className={styles.cardTitle}>{step.title}</p>
                <p className={styles.cardDescription}>{step.description}</p>
              </AnimateHoverItem>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
