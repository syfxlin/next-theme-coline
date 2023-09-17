import React from "react";
import { notFound } from "next/navigation";
import { fetcher } from "../../../../contents";
import { layouts, metadataPage } from "../../../../components/templates/page";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

const query = async ({ params }: Props) => {
  try {
    const query = await fetcher.posts();
    const slug = decodeURIComponent(params.slug).toLowerCase();
    for (let i = 0; i < query.items.length; i++) {
      const prev = query.items[i - 1];
      const curr = query.items[i];
      const next = query.items[i + 1];
      if (curr.slug === slug) {
        return {
          data: curr,
          prev: prev
            ? {
                name: prev.title,
                link: prev.link,
              }
            : undefined,
          next: next
            ? {
                name: next.title,
                link: next.link,
              }
            : undefined,
        };
      }
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const data = await query(props);
  if (!data) {
    return notFound();
  }
  return metadataPage(data);
};

export default async function Page(props: Props) {
  const data = await query(props);
  if (!data) {
    return notFound();
  }
  const Component = layouts.post;
  return <Component data={data.data} prev={data.prev} next={data.next} />;
}
