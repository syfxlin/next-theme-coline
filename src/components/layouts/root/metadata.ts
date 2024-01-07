import { Metadata } from "next";
import { image, resolve } from "../../../utils/vender";
import { fetcher } from "../../../contents";
import { COLINE_LANGUAGE } from "../../../env/public";

export type MetadataProps = {
  link?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
};

export const metadata = async (props?: MetadataProps): Promise<Metadata> => {
  const [seo, author] = await Promise.all([fetcher.seo(), fetcher.author()]);
  return {
    metadataBase: new URL(seo.link),
    applicationName: seo.title,
    title: props?.title ? `${props?.title} | ${seo.title}` : `${seo.title} - ${seo.subtitle}`,
    description: props?.description ?? seo.description,
    keywords: (seo.keywords as string[] | undefined) ?? [],
    authors: {
      url: resolve(seo.link),
      name: author.fullname,
    },
    creator: author.fullname,
    generator: "Next.PHP",
    manifest: "/manifest.json",
    alternates: {
      types: {
        "application/rss+xml": [{ title: `${seo.title} - ${seo.subtitle}`, url: "/rss.xml" }],
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: COLINE_LANGUAGE,
      siteName: seo.title,
      url: resolve(seo.link, props?.link),
      title: props?.title ? `${props?.title} | ${seo.title}` : `${seo.title} - ${seo.subtitle}`,
      description: props?.description ?? seo.description,
      images: resolve(seo.link, props?.thumbnail ?? seo.logo),
    },
    twitter: {
      card: "summary_large_image",
      creator: `@${author.username}`,
      site: seo.title,
      title: props?.title ? `${props?.title} | ${seo.title}` : `${seo.title} - ${seo.subtitle}`,
      description: props?.description ?? seo.description,
      images: resolve(seo.link, props?.thumbnail ?? seo.logo),
    },
    icons: [
      {
        url: image(seo.logo, 16),
        sizes: "16x16",
      },
      {
        url: image(seo.logo, 32),
        sizes: "32x32",
      },
      {
        url: image(seo.logo, 48),
        sizes: "48x48",
      },
      {
        url: image(seo.logo, 64),
        sizes: "64x64",
      },
      {
        url: image(seo.logo, 96),
        sizes: "96x96",
      },
      {
        url: image(seo.logo, 128),
        sizes: "128x128",
      },
      {
        url: image(seo.logo, 256),
        sizes: "256x256",
      },
    ],
  };
};
