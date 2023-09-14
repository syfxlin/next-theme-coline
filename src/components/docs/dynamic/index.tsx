"use client";
import dynamic from "next/dynamic";

export const Katex = dynamic(() => import("../katex/client").then((mod) => mod.Katex));
export const Github = dynamic(() => import("../github/client").then((mod) => mod.Github));
export const Article = dynamic(() => import("../article/client").then((mod) => mod.Article));
export const Message = dynamic(() => import("../message/client").then((mod) => mod.Message));
