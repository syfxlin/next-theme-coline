"use client";
import React from "react";
import { container } from "./index.css";
import { AuthorData, FooterData, SeoData } from "../../../contents/types";
import { Divider } from "../../ui/divider";
import { Link } from "../../ui/link";

export type ClientFooterProps = {
  seo: SeoData;
  author: AuthorData;
  footer: FooterData;
};

export const ClientFooter: React.FC<ClientFooterProps> = (props) => {
  return (
    <footer className={container}>
      <p>
        {props.footer.main.map((item, index) => (
          <React.Fragment key={item.link}>
            {index !== 0 && <Divider orientation="vertical" />}
            <Link unstyled aria-label={item.title} href={item.link}>
              {item.title}
            </Link>
          </React.Fragment>
        ))}
      </p>
      <p>
        Copyright © {props.seo.birthday.getFullYear()}-{new Date().getFullYear()} {props.author.fullname}
      </p>
      <p>
        Powered by{" "}
        <Link unstyled href="https://nextjs.org">
          Next.js
        </Link>
        <Divider orientation="vertical" />
        Designed by{" "}
        <Link unstyled href="https://ixk.me">
          Otstar Lin
        </Link>
      </p>
    </footer>
  );
};
