"use client";
import React, { ReactNode } from "react";
import { container, description, title } from "./index.css";

export type TitleProps = {
  title: ReactNode;
  children: ReactNode;
};

export const Title: React.FC<TitleProps> = (props) => {
  return (
    <section className={container}>
      <h1 className={title}>{props.title}</h1>
      <div className={description}>{props.children}</div>
    </section>
  );
};
