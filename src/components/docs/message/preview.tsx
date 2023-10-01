"use client";

import dynamic from "next/dynamic";

export const Message = dynamic(() => import("./index").then((mod) => mod.Message));
