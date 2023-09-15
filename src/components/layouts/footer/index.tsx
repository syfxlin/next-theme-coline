import * as styles from "./styles.css";
import React from "react";
import { Divider } from "../../ui/divider";
import { Link } from "../../ui/link";
import { fetcher } from "../../../contents";

export const Footer: React.FC = async () => {
  const [seo, author, footer] = await Promise.all([fetcher.seo(), fetcher.author(), fetcher.footer()]);
  return (
    <footer className={styles.container}>
      <p>
        {footer.main.map((item, index) => (
          <React.Fragment key={item.link}>
            {index !== 0 && <Divider orientation="vertical" />}
            <Link unstyled aria-label={item.title} href={item.link}>
              {item.title}
            </Link>
          </React.Fragment>
        ))}
      </p>
      <p>
        Copyright © {seo.birthday.getFullYear()}-{new Date().getFullYear()} {author.fullname}
      </p>
      <p>
        Powered by{" "}
        <Link unstyled href="https://nextjs.org">
          Next.js
        </Link>
        <Divider orientation="vertical" />
        Designed by{" "}
        <Link unstyled href="https://ixk.me">
          Otstar Lin
        </Link>
      </p>
    </footer>
  );
};
