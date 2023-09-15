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

const query = async ({ params }: Props) => {
  try {
    const query = await fetcher.pages();
    const slug = decodeURIComponent(params.slug).toLowerCase();
    const value = query.items.find((i) => i.slug === slug);
    if (!value) {
      return undefined;
    }
    return value;
  } catch (e) {
    return undefined;
  }
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const data = await query(props);
  if (!data) {
    return notFound();
  }
  return metadataPage({ data });
};

const Page: React.FC<Props> = async (props) => {
  const data = await query(props);
  if (!data) {
    return notFound();
  }
  const Component = layouts[data.layout];
  return <Component data={data} />;
};

export default Page;
