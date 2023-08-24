import { allPages } from "../../../contents";
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { layouts, metadataPage } from "../../../layouts/template-page";

type Props = {
  params: {
    slug: string;
  };
};

const query = ({ params }: Props) => {
  try {
    const slug = params.slug;
    const value = allPages.find((i) => i.slug.toLowerCase() === decodeURIComponent(slug).toLowerCase());
    if (!value) {
      return undefined;
    }
    return value;
  } catch (e) {
    return undefined;
  }
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const data = query(props);
  if (!data) {
    return notFound();
  }
  return metadataPage({ data });
};

const Page: React.FC<Props> = (props) => {
  const data = query(props);
  if (!data) {
    return notFound();
  }
  const Component = layouts[data.layout];
  return <Component data={data} />;
};

export default Page;
