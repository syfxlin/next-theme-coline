import React from "react";
import { Metadata } from "next";
import { metadata } from "../components/layouts/root/metadata";
import { Root } from "../components/layouts/root";

export const generateMetadata = async (): Promise<Metadata> => metadata();

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Root>{children}</Root>;
}
