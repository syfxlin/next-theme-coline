const createPwaPlugin = require("next-pwa");
const createBundleAnalyzer = require("@next/bundle-analyzer");
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withPwa = createPwaPlugin({ dest: "public" });
const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = createBundleAnalyzer({ enabled: false });

module.exports = withPwa(withVanillaExtract(withBundleAnalyzer()));
