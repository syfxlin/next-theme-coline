"use client";
import dynamic from "next/dynamic";

export const Article = dynamic(() => import("./client").then(mod => mod.Article));
