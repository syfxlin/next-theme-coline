"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Spotlight } from "../../root/spotlight";
import { Search as Icon } from "@icon-park/react";

export const Search: React.FC = () => {
  const [active, setActive] = useState(false);
  return (
    <>
      <Button tippy aria-label="搜索" onClick={() => setActive((p) => !p)}>
        <Icon />
      </Button>
      <Spotlight active={active} setActive={setActive} />
    </>
  );
};
