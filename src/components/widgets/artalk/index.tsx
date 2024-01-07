"use client";
import "artalk/dist/Artalk.css";
import * as styles from "./styles.css";
import React, { useEffect, useRef } from "react";
import type ArtalkComment from "artalk";
import { COLINE_ARTALK_SERVER_URL, COLINE_ARTALK_SITE_NAME } from "../../../env/public";
import { useTheme } from "next-themes";
import { t } from "../../../locales";

type Props = {
  name: string;
  link: string;
};

export const Artalk: React.FC<Props> = ({ name, link }) => {
  const { resolvedTheme } = useTheme();
  const artalk = useRef<ArtalkComment>();
  const element = useRef<HTMLElement>(null);
  useEffect(() => {
    if (COLINE_ARTALK_SITE_NAME && COLINE_ARTALK_SERVER_URL && element.current) {
      import("artalk").then((mod) => {
        if (element.current) {
          artalk.current = new mod.default({
            el: element.current,
            pageTitle: name,
            pageKey: link,
            darkMode: resolvedTheme === "dark",
            server: COLINE_ARTALK_SERVER_URL,
            site: COLINE_ARTALK_SITE_NAME,
          });
        }
      });
    }
    return () => {
      if (COLINE_ARTALK_SITE_NAME && COLINE_ARTALK_SERVER_URL && artalk.current) {
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
