"use client";
import dynamic from "next/dynamic";
import { Loading } from "../../ui/loading";

export const Friends = dynamic(() => import("./index"), { ssr: false, loading: () => <Loading /> });
