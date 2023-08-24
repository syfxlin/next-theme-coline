"use client";
import React, { PropsWithChildren } from "react";
import { container } from "./index.css";

export type ClientMainProps = PropsWithChildren<{}>;

export const ClientMain: React.FC<ClientMainProps> = ({ children }) => {
  return <main className={container}>{children}</main>;
};
