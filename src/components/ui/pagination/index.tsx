"use client";
import React from "react";
import { active, container, cursor_container, cursor_link, gap, more } from "./index.css";
import { LinkButton } from "../button";
import { range, resolve } from "../../../utils/vender";
import { Left, Right } from "@icon-park/react";

export type PaginationProps = {
  index: number;
  pages: number;
  links?: string;
  onLink?: (page: number) => string;
  onPage?: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ index, pages, links, onLink, onPage }) => {
  return (
    <section className={container}>
      {index !== 1 && (
        <LinkButton
          className={gap}
          aria-label="上一页"
          href={links !== undefined ? resolve(links, "page", index - 1) : onLink?.(index - 1) ?? "#"}
          onClick={() => onPage?.(index - 1)}
        >
          <Left /> 上一页
        </LinkButton>
      )}
      {pages >= 1 && (
        <LinkButton
          className={index === 1 ? active : ""}
          aria-label="第 1 页"
          href={links !== undefined && links !== null ? resolve(links, "page", 1) : onLink?.(1) ?? "#"}
          onClick={() => onPage?.(1)}
          key="page-1"
        >
          1
        </LinkButton>
      )}
      {index >= 3 && <span className={more}>...</span>}
      {range(index - 1, index + 1)
        .filter((i) => i > 1 && i < pages)
        .map((i) => (
          <LinkButton
            className={index === i ? active : ""}
            aria-label={`第 ${i} 页`}
            href={links !== undefined && links !== null ? resolve(links, "page", i) : onLink?.(i) ?? "#"}
            onClick={() => onPage?.(i)}
            key={`page-${i}`}
          >
            {i}
          </LinkButton>
        ))}
      {index <= pages - 3 && <span className={more}>...</span>}
      {pages >= 2 && (
        <LinkButton
          className={index === pages ? active : ""}
          aria-label={`第 ${pages} 页`}
          href={links !== undefined && links !== null ? resolve(links, "page", pages) : onLink?.(pages) ?? "#"}
          onClick={() => onPage?.(pages)}
          key={`page-${pages}`}
        >
          {pages}
        </LinkButton>
      )}
      {index !== pages && (
        <LinkButton
          className={gap}
          aria-label="下一页"
          href={links !== undefined && links !== null ? resolve(links, "page", index + 1) : onLink?.(index + 1) ?? "#"}
          onClick={() => onPage?.(index + 1)}
        >
          下一页 <Right />
        </LinkButton>
      )}
    </section>
  );
};

export type CursorPaginationProps = {
  prev?: {
    name: string;
    link: string;
  };
  next?: {
    name: string;
    link: string;
  };
};

export const CursorPagination: React.FC<CursorPaginationProps> = (props) => {
  return (
    <section className={cursor_container}>
      {props.prev && (
        <LinkButton
          className={cursor_link}
          style={{ justifyContent: "flex-start" }}
          aria-label={`上一页：${props.prev.name}`}
          href={props.prev.link}
        >
          <Left /> {props.prev.name}
        </LinkButton>
      )}
      {props.next && (
        <LinkButton
          className={cursor_link}
          style={{ justifyContent: "flex-end" }}
          aria-label={`下一页：${props.next.name}`}
          href={props.next.link}
        >
          {props.next.name} <Right />
        </LinkButton>
      )}
    </section>
  );
};
