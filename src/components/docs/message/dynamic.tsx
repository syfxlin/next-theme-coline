"use client";
import dynamic from "next/dynamic";

export const Message = dynamic(() => import("./client").then((mod) => mod.Message));
