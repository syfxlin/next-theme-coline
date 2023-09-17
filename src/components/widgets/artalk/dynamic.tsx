"use client";
import dynamic from "next/dynamic";

export const Artalk = dynamic(() => import("./index").then((mod) => mod.Artalk), { ssr: false });
