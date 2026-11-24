"use client";
import { TooltipHost } from "@components";
import { MESSENGER_LINK, ZALO_LINK, ZALO_PHONE } from "@constants";
import Image from "next/image";
import Link from "next/link";
import { trackContactClick } from "../../../lib/analytics";
import styles from "./ChatWidget.module.scss";

const phoneGift = "/images/phone_gift.gif";
export const ChatWidget: React.FC = () => {
  return (
    <div className={styles.chat_widget}>
      <TooltipHost content={`Liên hệ qua: ${ZALO_PHONE}`} side="left">
        <a
          className={styles.chat_button}
          href={`tel:${ZALO_PHONE}`}
          onClick={() => trackContactClick("hotline")}
        >
          <Image
            unoptimized
            loading="lazy"
            className={styles.phone_img}
            src={phoneGift}
            width={48}
            height={48}
            alt="Gọi Hotline Axhome"
            title="Gọi Hotline tư vấn trực tiếp Axhome"
          />
        </a>
      </TooltipHost>
      <TooltipHost content="Chat với chúng tôi trên Messenger" side="left">
        <Link
          className={styles.chat_button}
          href={MESSENGER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick("messenger")}
        >
          <Image
            loading="lazy"
            src="https://cdn.shopify.com/s/files/1/0709/6211/8897/files/SyMC7xrWfi4u2iWOB3uAqjPxeuIlC8qooKrBbLIyPkpbmSMi116495.png?v=1729043757"
            width={48}
            height={48}
            alt="Chat Messenger cùng Axhome"
            title="Chat với kiến trúc sư Axhome qua Messenger"
          />
        </Link>
      </TooltipHost>
      <TooltipHost content="Chat với chúng tôi trên Zalo" side="left">
        <Link
          className={styles.chat_button}
          href={ZALO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick("zalo")}
        >
          <Image
            loading="lazy"
            src="https://cdn.shopify.com/s/files/1/0709/6211/8897/files/zalo_3814521.png?v=1729013894"
            width={48}
            height={48}
            alt="Chat Zalo cùng Axhome"
            title="Chat với kiến trúc sư Axhome qua Zalo"
          />
        </Link>
      </TooltipHost>
    </div>
  );
};
