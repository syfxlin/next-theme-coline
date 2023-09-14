import { NextConfig } from "next";
import { COLINE_ANALYZE, IS_DEV } from "../env/private";
import createPwaPlugin from "next-pwa";
import createBundleAnalyzer from "@next/bundle-analyzer";
import { createVanillaExtractPlugin } from "@syfxlin/next-plugin-vanilla-extract";

const withPwa = createPwaPlugin({ dest: "public" });
const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = createBundleAnalyzer({ enabled: !IS_DEV && COLINE_ANALYZE === "true" });

export const withColine = (config?: Partial<NextConfig>): Partial<NextConfig> => {
  return withPwa(withVanillaExtract(withBundleAnalyzer(config)));
};
