"use client";
import * as styles from "./styles.css";
import React from "react";
import { AppProgressBar } from "next-nprogress-bar";

export const ProgressBar: React.FC = () => {
  return <AppProgressBar color={styles.color} shallowRouting />;
};
