import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetcher, slugger } from "../../../../contents";
import { TemplateGroup, metadataGroup } from "../../../../components/templates/group";
import { t } from "../../../../locales";

interface Props {
  params: {
    slug: string;
    index?: string;
  };
}

const query = React.cache(async (_slug: string, _index?: string) => {
  try {
    const query = await fetcher.archives();
    const slug = slugger(decodeURIComponent(_slug));
    const index = _index ? Number.parseInt(_index) : 1;
    const value = query.pages.find(i => i.slug === slug);
    if (!value || value.pages < index) {
      return undefined;
    }
    return {
      name: value.name,
      slug: value.slug,
      link: value.link,
      index,
      pages: value.pages,
      total: value.total,
      items: value.page(index),
    };
  } catch (e) {
    return undefined;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await query(params.slug, params.index);
  if (!data) {
    return notFound();
  }
  return metadataGroup({
    type: t("archive.name"),
    name: data.name,
    link: data.link,
    index: data.index,
    pages: data.pages,
    total: data.total,
  });
}

export default async function ArchivePage({ params }: Props) {
  const data = await query(params.slug, params.index);
  if (!data) {
    return notFound();
  }
  return (
    <TemplateGroup
      type={t("archive.name")}
      name={data.name}
      link={data.link}
      index={data.index}
      pages={data.pages}
      total={data.total}
      items={data.items}
    />
  );
}
