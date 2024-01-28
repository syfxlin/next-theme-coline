"use client";
import React, { useState } from "react";
import { cx } from "@syfxlin/reve";
import { TocData } from "@syfxlin/reks";
import { useIntersectionObserver } from "../../../hooks/use-intersection-observer";
import { Link } from "../../ui/link";
import * as styles from "./styles.css";

export interface TocProps {
  data: ReadonlyArray<TocData>;
}

const Item: React.FC<TocProps & { active: string }> = ({ data, active }) => {
  if (!data?.length) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {data.map(i => (
        <li key={`toc-${i.slug}`} id={`toc-${i.slug}`} className={styles.item}>
          <Link className={cx(i.slug === active && "active")} href={`#${i.slug}`} aria-label={i.name}>
            - {i.name}
          </Link>
          {i.children && <Item data={i.children} active={active} />}
        </li>
      ))}
    </ul>
  );
};

export const Toc: React.FC<TocProps> = ({ data }) => {
  const [active, setActive] = useState<string>("");

  useIntersectionObserver(id => setActive(id));

  return (
    <aside className={styles.container}>
      <Item data={data} active={active} />
    </aside>
  );
};
