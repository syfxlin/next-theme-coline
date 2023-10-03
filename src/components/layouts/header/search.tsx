"use client";
import React, { ReactNode, useState } from "react";
import { Button } from "../../ui/button";
import { Spotlight } from "../../root/spotlight";
import * as styles from "./styles.css";

export type SearchProps = {
  icon: ReactNode;
};

export const Search: React.FC<SearchProps> = ({ icon }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <Button tippy aria-label="搜索" onClick={() => setActive((p) => !p)} className={styles.always_icon}>
        <span>搜索</span>
        {icon}
      </Button>
      <Spotlight active={active} setActive={setActive} />
    </>
  );
};
