import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetcher, slugger } from "../../../../contents";
import { metadataGroup, TemplateGroup } from "../../../../components/templates/group";

type Props = {
  params: {
    slug: string;
    index?: string;
  };
};

const query = async ({ params }: Props) => {
  try {
    const query = await fetcher.archives();
    const slug = slugger(decodeURIComponent(params.slug));
    const index = params.index ? parseInt(params.index) : 1;
    const value = query.pages.find((i) => i.slug === slug);
    if (!value || value.pages < index) {
      return undefined;
    }
    return {
      name: value.name,
      slug: value.slug,
      link: value.link,
      index: index,
      pages: value.pages,
      total: value.total,
      items: value.page(index),
    };
  } catch (e) {
    return undefined;
  }
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const data = await query(props);
  if (!data) {
    return notFound();
  }
  return metadataGroup({
    type: "归档",
    name: data.name,
    link: data.link,
    index: data.index,
    pages: data.pages,
    total: data.total,
  });
};

export default async function ArchivePage(props: Props) {
  const data = await query(props);
  if (!data) {
    return notFound();
  }
  return (
    <TemplateGroup
      type="归档"
      name={data.name}
      link={data.link}
      index={data.index}
      pages={data.pages}
      total={data.total}
      items={data.items}
    />
  );
}
