import React from "react";
import { metadata } from "../layouts/root/metadata";
import { Metadata } from "next";
import { Root } from "../layouts/root";

export const generateMetadata = async (): Promise<Metadata> => metadata();

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Root>{children}</Root>;
}
