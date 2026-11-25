import { COMPANY_INFO } from "@constants";
import { cn } from "@lib";
import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.scss";

type LogoProps = {
  size?: "medium" | "large";
  asLink?: boolean;
};

const Logo: React.FC<LogoProps> = ({ size = "medium", asLink = true }) => {
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

  const classNames = cn(
    styles.brand,
    size === "large" ? styles.logoLarge : styles.logoMedium,
  );

  const innerContent = (
    <>
      <div className={styles.brandLogo} aria-hidden="true">
        <div className={styles.logoWrapper} style={logoSize()}>
          <Image
            src="/images/axhome_logo.png"
            alt={`${COMPANY_INFO.brandName} logo`}
            title={`${COMPANY_INFO.brandName} — ${COMPANY_INFO.tagline}`}
            className={styles.logoImage}
            sizes={size === "large" ? "120px" : "90px"}
            priority={size !== "large"}
            fill
          />
        </div>
      </div>
      <div className={styles.brandText}>
        <span className={styles.brandName}>Axhome</span>
        <span className={styles.brandTagline}>{COMPANY_INFO.logoTagline}</span>
      </div>
    </>
  );

  if (!asLink) {
    return <div className={classNames}>{innerContent}</div>;
  }

  return (
    <Link
      href="/"
      className={classNames}
      aria-label={`${COMPANY_INFO.brandName} Trang Chủ`}
    >
      {innerContent}
    </Link>
  );
};

export default Logo;
