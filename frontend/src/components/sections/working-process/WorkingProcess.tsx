import { AnimateIcon } from "@animate-ui/react/icons";
import { Container } from "@components";
import { WORKING_PROCESS_STEPS } from "@constants";
import type React from "react";
import { ClipboardList } from "@/components/animate-ui/icons/clipboard-list";
import { Hammer } from "@/components/animate-ui/icons/hammer";
import { Key } from "@/components/animate-ui/icons/key";
import { MapPin } from "@/components/animate-ui/icons/map-pin";
import { MessageSquare } from "@/components/animate-ui/icons/message-square";
import { Sparkles } from "@/components/animate-ui/icons/sparkles";
import styles from "./WorkingProcess.module.scss";

const STEP_ICONS: React.ReactNode[] = [
  <MessageSquare key="step-1" size={20} />,
  <MapPin key="step-2" size={20} />,
  <Sparkles key="step-3" size={20} />,
  <ClipboardList key="step-4" size={20} />,
  <Hammer key="step-5" size={20} />,
  <Key key="step-6" size={20} />,
];

export const WorkingProcess: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="working-process-heading"
    >
      <Container>
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

        <ol className={styles.grid}>
          {WORKING_PROCESS_STEPS.map((step, index) => (
            <li key={step.id} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.number} aria-hidden="true">
                  {step.number}
                </span>
                <AnimateIcon
                  animateOnHover
                  className={styles.iconBox}
                  aria-hidden="true"
                >
                  {STEP_ICONS[index]}
                </AnimateIcon>
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDescription}>{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};
