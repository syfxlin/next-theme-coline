"use client";
import dynamic from "next/dynamic";

export const Friends = dynamic(() => import("./index"), { ssr: false });
