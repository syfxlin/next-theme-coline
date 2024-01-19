"use client";
import React, { useState } from "react";
import { cx } from "@syfxlin/reve";
import { useIntersectionObserver } from "../../../hooks/use-intersection-observer";
import { TocData } from "../../../contents/types";
import { Link } from "../../ui/link";
import { Iconify } from "../../ui/iconify/client";
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
            {i.name}
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
      <Iconify icon={styles.icon} />
      <Item data={data} active={active} />
    </aside>
  );
};
