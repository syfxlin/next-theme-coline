import * as styles from "./styles.css";
import React from "react";
import { cx } from "@syfxlin/reve";
import { fetcher } from "../../../contents";
import { Icon } from "../../ui/icon";
import { Image } from "../../ui/image";
import { LinkButton } from "../../ui/button";
import { Rss } from "./rss";
import { Theme } from "./theme";
import { Search } from "./search";

export const Header: React.FC = async () => {
  const [seo, header] = await Promise.all([fetcher.seo(), fetcher.header()]);
  return (
    <header className={styles.container}>
      <LinkButton className={styles.left} aria-label="首页" href="/">
        <Image className={styles.logo} src={seo.logo} alt="站点图标" />
      </LinkButton>
      <div className={styles.right}>
        {header.main.map((item) => (
          <LinkButton
            tippy
            key={`nav-${item.link}`}
            href={item.link}
            aria-label={item.title}
            className={cx(
              item.view === "always" && styles.always,
              item.view === "elastic" && styles.elastic,
              item.view === "always-icon" && styles.always_icon,
              item.view === "elastic-icon" && styles.elastic_icon,
            )}
          >
            <span>{item.title}</span>
            <Icon data={item.icon} />
          </LinkButton>
        ))}
        <Rss />
        <Theme />
        <Search />
      </div>
    </header>
  );
};
