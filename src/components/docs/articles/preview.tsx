"use client";
import dynamic from "next/dynamic";

export const Articles = dynamic(() => import("./client").then((mod) => mod.Articles));
