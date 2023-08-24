"use client";
import dynamic from "next/dynamic";

export const Artalk = dynamic(() => import("./index"), { ssr: false });
