import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetcher } from "../../../../contents";
import { layouts, metadataPage } from "../../../../components/templates/page";

interface Props {
  params: {
    slug: string;
  };
}

const query = React.cache(async (_slug: string) => {
  try {
    const query = await fetcher.posts();
    const slug = decodeURIComponent(_slug).toLowerCase();
    for (let i = 0; i < query.items.length; i++) {
      const prev = query.items[i - 1];
      const curr = query.items[i];
      const next = query.items[i + 1];
      if (curr.slug === slug) {
        return {
          data: curr,
          prev: prev ?
              {
                name: prev.title,
                link: prev.link,
              } :
            undefined,
          next: next ?
              {
                name: next.title,
                link: next.link,
              } :
            undefined,
        };
      }
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await query(params.slug);
  if (!data) {
    return notFound();
  }
  return metadataPage(data);
}

export default async function Page({ params }: Props) {
  const data = await query(params.slug);
  if (!data) {
    return notFound();
  }
  const Component = layouts.post;
  return <Component data={data.data} prev={data.prev} next={data.next} />;
}
