"use client";
import React, { ReactNode, useState } from "react";
import { container, left, logo, right } from "./index.css";
import { Icon } from "../../ui/icon";
import { Image } from "../../ui/image";
import { Spotlight } from "../../root/spotlight";
import { Button, LinkButton } from "../../ui/button";
import { DarkMode, Rss, Search } from "@icon-park/react";
import { useResponsive } from "../../../hooks/use-responsive";
import { HeaderData, SeoData } from "../../../contents/types";
import { resolve } from "../../../utils/vender";
import { useTheme } from "next-themes";

export type ClientHeaderProps = {
  seo: SeoData;
  header: HeaderData;
};

export const ClientHeader: React.FC<ClientHeaderProps> = (props) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const responsive = useResponsive("md");
  const [active, setActive] = useState(false);

  return (
    <>
      <header className={container}>
        <LinkButton className={left} aria-label="首页" href="/">
          <Image
            className={logo}
            src={props.seo.logo.src}
            alt={props.seo.logo.alt}
            width={props.seo.logo.width}
            height={props.seo.logo.height}
            blurDataURL={props.seo.logo.blurDataURL}
            blurWidth={props.seo.logo.blurWidth}
            blurHeight={props.seo.logo.blurHeight}
          />
        </LinkButton>
        <div className={right}>
          {props.header.main.map((item) => {
            let element: ReactNode = null;

            if (!responsive) {
              if (item.view === "always") {
                element = item.title;
              }
              if (item.view === "elastic") {
                element = item.title;
              }
              if (item.view === "always-icon") {
                element = <Icon data={item.icon} />;
              }
              if (item.view === "elastic-icon") {
                element = <Icon data={item.icon} />;
              }
            } else {
              if (item.view === "always") {
                element = item.title;
              }
              if (item.view === "elastic") {
                element = <Icon data={item.icon} />;
              }
              if (item.view === "always-icon") {
                element = <Icon data={item.icon} />;
              }
              if (item.view === "elastic-icon") {
                element = null;
              }
            }
            return (
              element && (
                <LinkButton tippy key={`nav-${item.link}`} href={item.link} aria-label={item.title}>
                  {element}
                </LinkButton>
              )
            );
          })}
          <LinkButton tippy aria-label="RSS" href={resolve(props.seo.link, "rss.xml")}>
            <Rss />
          </LinkButton>
          <Button tippy aria-label="搜索" onClick={() => setActive((p) => !p)}>
            <Search />
          </Button>
          <Button
            aria-label="切换暗色模式"
            tippy={{ content: `当前模式：${theme === "system" ? `${theme} (${resolvedTheme})` : theme}` }}
            onClick={() => {
              if (theme === "system") {
                setTheme("light");
              } else if (theme === "light") {
                setTheme("dark");
              } else {
                setTheme("system");
              }
            }}
          >
            <DarkMode />
          </Button>
        </div>
      </header>
      <Spotlight active={active} setActive={setActive} />
    </>
  );
};
