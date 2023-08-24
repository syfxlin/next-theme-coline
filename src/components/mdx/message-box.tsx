"use client";
import React, { ReactNode } from "react";
import { error, info, success, warn } from "./message-box.css";

const mapping = { info, warn, success, error };

export type MessageBoxProps = {
  type: "warn" | "info" | "error" | "success";
  children?: ReactNode;
};

export const MessageBox: React.FC<MessageBoxProps> = ({ type, children }) => {
  return <div className={mapping[type ?? "success"]}>{children}</div>;
};
