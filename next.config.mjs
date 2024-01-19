import createPwaPlugin from "next-pwa";
import createBundleAnalyzer from "@next/bundle-analyzer";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { COLINE_ANALYZE, IS_DEV } from "./src/env/private.mjs";

const withPwa = createPwaPlugin({ dest: "public" });
const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = createBundleAnalyzer({ enabled: !IS_DEV && COLINE_ANALYZE === "true" });

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  experimental: {
    appDir: true,
    serverActions: true,
    useDeploymentId: true,
    useDeploymentIdServerActions: true,
    serverComponentsExternalPackages: ["shikiji"],
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
