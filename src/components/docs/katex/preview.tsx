"use client";
import dynamic from "next/dynamic";

export const Katex = dynamic(() => import("./index").then(mod => mod.Katex));
