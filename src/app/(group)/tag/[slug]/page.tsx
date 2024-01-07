import React from "react";
import { Metadata } from "next";
import { fetcher, slugger } from "../../../../contents";
import { notFound } from "next/navigation";
import { metadataGroup, TemplateGroup } from "../../../../components/templates/group";
import { t } from "../../../../locales";

type Props = {
  params: {
    slug: string;
    index?: string;
  };
};

const query = React.cache(async (_slug: string, _index?: string) => {
  try {
    const query = await fetcher.tags();
    const slug = slugger(_slug);
    const index = _index ? parseInt(_index) : 1;
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
});

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const data = await query(params.slug, params.index);
  if (!data) {
    return notFound();
  }
  return metadataGroup({
    type: t("tag.name"),
    name: data.name,
    link: data.link,
    index: data.index,
    pages: data.pages,
    total: data.total,
  });
};

export default async function TagPage({ params }: Props) {
  const data = await query(params.slug, params.index);
  if (!data) {
    return notFound();
  }
  return (
    <TemplateGroup
      type={t("tag.name")}
      name={data.name}
      link={data.link}
      index={data.index}
      pages={data.pages}
      total={data.total}
      items={data.items}
    />
  );
}
