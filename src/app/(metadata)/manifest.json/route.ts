import { MetadataRoute } from "next";
import { fetcher } from "../../../contents";
import { NextResponse } from "next/server";
import { image } from "../../../utils/vender";

export const GET = async () => {
  const seo = await fetcher.seo();

  const manifest: MetadataRoute.Manifest = {
    name: `${seo.title} - ${seo.subtitle}`,
    short_name: seo.title,
    start_url: "/",
    display: "standalone",
    theme_color: "#5755d9",
    background_color: "#FFFFFF",
    icons: [
      {
        src: image(seo.logo, 16),
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: image(seo.logo, 32),
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: image(seo.logo, 48),
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: image(seo.logo, 64),
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: image(seo.logo, 96),
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: image(seo.logo, 128),
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: image(seo.logo, 256),
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};
