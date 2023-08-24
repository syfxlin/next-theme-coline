import { NextConfig } from "next";
import { COLINE_ANALYZE } from "../env/private";
import createPwaPlugin from "next-pwa";
import createBundleAnalyzer from "@next/bundle-analyzer";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { createContentlayerPlugin } from "next-contentlayer";

const withPwa = createPwaPlugin({ dest: "public" });
const withContentlayer = createContentlayerPlugin();
const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = createBundleAnalyzer({ enabled: COLINE_ANALYZE === "true" });

export const withColine = (config?: Partial<NextConfig>): Partial<NextConfig> => {
  return withPwa(withContentlayer(withVanillaExtract(withBundleAnalyzer(config))));
};
