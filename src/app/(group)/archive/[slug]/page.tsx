import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { paginationArchives } from "../../../../contents";
import { metadataGroup, TemplateGroup } from "../../../../layouts/template-group";

type Props = {
  params: {
    slug: string;
    index?: string;
  };
};

const query = ({ params }: Props) => {
  try {
    const slug = params.slug;
    const index = params.index ? parseInt(params.index) : 1;
    const value = paginationArchives.find((i) => i.slug.toLowerCase() === decodeURIComponent(slug).toLowerCase());
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
  const data = query(props);
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

const ArchivePage: React.FC<Props> = (props) => {
  const data = query(props);
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
};

export default ArchivePage;
