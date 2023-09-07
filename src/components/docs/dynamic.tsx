"use client";
import dynamic from "next/dynamic";

export const Katex = dynamic(() => import("./katex").then((mod) => mod.Katex));
export const Github = dynamic(() => import("./github").then((mod) => mod.Github));
export const Article = dynamic(() => import("./article").then((mod) => mod.Article));
export const Message = dynamic(() => import("./message").then((mod) => mod.Message));
