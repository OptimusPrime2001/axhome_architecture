import { COMPANY_INFO } from "@constants";
import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.scss";

type LogoProps = {
  size?: "medium" | "large";
};

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const logoSize = () => {
    if (size === "large")
      return {
        height: "80px",
        width: "120px",
      };
    return {
      height: "50px",
      width: "90px",
    };
  };
  return (
    <Link
      href="/"
      className={styles.brand}
      aria-label={`${COMPANY_INFO.brandName} Trang Chủ`}
    >
      <div className={styles.brandLogo} aria-hidden="true">
        <div className={styles.logoWrapper} style={logoSize()}>
          <Image
            src="/images/axhome_logo.png"
            alt={`${COMPANY_INFO.brandName} logo`}
            className={styles.logoImage}
            priority
            fill
          />
        </div>
      </div>
      <div className={styles.brandText}>
        <span className={styles.brandName}>Axhome</span>
        <span className={styles.brandTagline}>{COMPANY_INFO.logoTagline}</span>
      </div>
    </Link>
  );
};

export default Logo;
