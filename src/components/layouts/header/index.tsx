import React from "react";
import { cx } from "@syfxlin/reve";
import { fetcher } from "../../../contents";
import { Iconify } from "../../ui/iconify";
import { Image } from "../../ui/image";
import { t } from "../../../locales";
import { Theme } from "./theme";
import { Search } from "./search";
import * as styles from "./styles.css";
import { Blog } from "./blog";
import { Menu } from "./menu";
import { Link } from "./link";

export const Header: React.FC = async () => {
  const [seo, header] = await Promise.all([fetcher.seo(), fetcher.header()]);
  return (
    <>
      <Menu icon={<Iconify icon="ri:menu-line" />} />
      <header className={styles.container}>
        <div className={styles.left}>
          <Link aria-label={t("header.home")} href="/">
            <Image className={styles.icon} src={seo.logo} alt={t("header.icon")} />
          </Link>
        </div>
        <div className={styles.right}>
          <Blog icon={<Iconify icon="ri:article-line" />} />
          {header.main.map(item => (
            <Link
              tooltip={{ placement: "left" }}
              key={`nav-${item.link}`}
              href={item.link}
              aria-label={item.title}
              className={cx(
                item.view === "text" && styles.view_text,
                item.view === "icon" && styles.view_icon,
                item.view === "elastic" && styles.view_elastic,
                item.view === "elastic-text" && styles.view_elastic_text,
                item.view === "elastic-icon" && styles.view_elastic_icon,
              )}
            >
              <span><span>「</span>{item.title}<span>」</span></span>
              <Iconify icon={item.icon} />
            </Link>
          ))}
          <Theme icon={<Iconify icon="ri:sun-line" />} />
          <Search icon={<Iconify icon="ri:search-line" />} />
        </div>
      </header>
    </>
  );
};
