import React from "react";
import { cx } from "@syfxlin/reve";
import { fetcher } from "../../../contents";
import { LinkButton } from "../../ui/button";
import { Iconify } from "../../ui/iconify";
import { Rss } from "./rss";
import { Home } from "./home";
import { Theme } from "./theme";
import { Search } from "./search";
import * as styles from "./styles.css";

export const Header: React.FC = async () => {
  const header = await fetcher.header();
  return (
    <header className={styles.container}>
      <div className={styles.right}>
        <Home home={<Iconify icon="ri:home-5-line" />} blog={<Iconify icon="ri:article-line" />} />
        {header.main.map(item => (
          <LinkButton
            tooltip
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
            <span>{item.title}</span>
            <Iconify icon={item.icon} />
          </LinkButton>
        ))}
        <Rss icon={<Iconify icon="ri:rss-line" />} />
        <Theme icon={<Iconify icon="ri:sun-line" />} />
        <Search icon={<Iconify icon="ri:search-line" />} />
      </div>
    </header>
  );
};
