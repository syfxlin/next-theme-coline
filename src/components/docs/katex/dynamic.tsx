"use client";
import dynamic from "next/dynamic";

export const Katex = dynamic(() => import("./client").then((mod) => mod.Katex));
