"use client";
import React, { ReactNode } from "react";
import { error, info, success, warn } from "./message.css";

const mapping = { info, warn, success, error };

export type MessageProps = {
  type: "warn" | "info" | "error" | "success";
  children?: ReactNode;
};

export const Message: React.FC<MessageProps> = ({ type, children }) => {
  return <div className={mapping[type ?? "success"]}>{children}</div>;
};
