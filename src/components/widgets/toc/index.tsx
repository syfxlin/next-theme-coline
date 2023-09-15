"use client";
import * as styles from "./styles.css";
import React, { useState } from "react";
import { LinkButton } from "../../ui/button";
import { cx } from "@syfxlin/reve";
import { useIntersectionObserver } from "../../../hooks/use-intersection-observer";
import { TocData } from "../../../contents/types";

export type TocProps = {
  data: ReadonlyArray<TocData>;
};

const Item: React.FC<TocProps & { active: string }> = ({ data, active }) => {
  if (!data?.length) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {data.map((i) => (
        <li
          key={`toc-${i.slug}`}
          id={`toc-${i.slug}`}
          className={cx("slide-enter", styles.item)}
          style={{ "--enter-step": i.step } as any}
        >
          <LinkButton tippy className={cx(i.slug === active && "active")} href={`#${i.slug}`} aria-label={i.name}>
            {i.name}
          </LinkButton>
          {i.children && <Item data={i.children} active={active} />}
        </li>
      ))}
    </ul>
  );
};

export const Toc: React.FC<TocProps> = ({ data }) => {
  const [active, setActive] = useState<string>("");

  useIntersectionObserver((id) => setActive(id));

  return (
    <aside className={styles.container}>
      <Item data={data} active={active} />
    </aside>
  );
};
