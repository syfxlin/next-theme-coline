import createPwaPlugin from "next-pwa";
import createBundleAnalyzer from "@next/bundle-analyzer";
import { COLINE_ANALYZE, IS_DEV } from "./src/env/private.js";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withPwa = createPwaPlugin({ dest: "public" });
const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = createBundleAnalyzer({ enabled: !IS_DEV && COLINE_ANALYZE === "true" });

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  experimental: {
    serverActions: true,
    useDeploymentId: true,
    useDeploymentIdServerActions: true,
    serverMinification: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withPwa(withVanillaExtract(withBundleAnalyzer(config)));
