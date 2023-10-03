import { fetcher } from "../../../contents";
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { layouts, metadataPage } from "../../../components/templates/page";

type Props = {
  params: {
    slug: string;
  };
};

const query = React.cache(async (_slug: string) => {
  try {
    const query = await fetcher.pages();
    const slug = decodeURIComponent(_slug).toLowerCase();
    const value = query.items.find((i) => i.slug === slug);
    if (!value) {
      return undefined;
    }
    return value;
  } catch (e) {
    return undefined;
  }
});

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const data = await query(params.slug);
  if (!data) {
    return notFound();
  }
  return metadataPage({ data });
};

export default async function Page({ params }: Props) {
  const data = await query(params.slug);
  if (!data) {
    return notFound();
  }
  const Component = layouts[data.layout];
  return <Component data={data} />;
}
