"use client";
import React from "react";
import { AppProgressBar } from "next-nprogress-bar";
import { color } from "./index.css";

export const ProgressBar: React.FC = () => {
  return <AppProgressBar color={color} />;
};
