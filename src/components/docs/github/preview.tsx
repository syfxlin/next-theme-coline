"use client";
import dynamic from "next/dynamic";

export const Github = dynamic(() => import("./client").then(mod => mod.Github));
