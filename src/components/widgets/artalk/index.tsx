"use client";
import "artalk/dist/Artalk.css";
import React, { useEffect, useRef } from "react";
import type ArtalkComment from "artalk";
import { useTheme } from "next-themes";
import { COLINE_ARTALK_SERVER_URL, COLINE_ARTALK_SITE_NAME } from "../../../env/public";
import { t } from "../../../locales";
import * as styles from "./styles.css";

interface Props {
  name: string;
  link: string;
}

export const Artalk: React.FC<Props> = ({ name, link }) => {
  const { resolvedTheme } = useTheme();
  const artalk = useRef<ArtalkComment>();
  const element = useRef<HTMLElement>(null);
  useEffect(() => {
    import("artalk").then((mod) => {
      if (element.current) {
        let node = element.current.querySelector("#artalk") as HTMLElement | undefined;
        if (!node) {
          node = document.createElement("div");
          node.id = "artalk";
          element.current.append(node);
        }
        // eslint-disable-next-line new-cap
        artalk.current = new mod.default({
          el: node,
          pageTitle: name,
          pageKey: link,
          darkMode: resolvedTheme === "dark",
          server: COLINE_ARTALK_SERVER_URL,
          site: COLINE_ARTALK_SITE_NAME,
        });
      }
    });
    return () => {
      if (artalk.current) {
        artalk.current?.destroy();
      }
    };
  }, [name, link, resolvedTheme]);
  if (COLINE_ARTALK_SITE_NAME && COLINE_ARTALK_SERVER_URL) {
    return <section ref={element} aria-label={t("article.comment")} className={styles.container} />;
  } else {
    return null;
  }
};
