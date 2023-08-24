import React from "react";
import { notFound } from "next/navigation";
import { allPosts } from "../../../../contents";
import { layouts, metadataPage } from "../../../../layouts/template-page";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

const query = ({ params }: Props) => {
  try {
    const slug = params.slug;
    for (let i = 0; i < allPosts.length; i++) {
      const prev = allPosts[i - 1];
      const curr = allPosts[i];
      const next = allPosts[i + 1];
      if (curr.slug.toLowerCase() === decodeURIComponent(slug).toLowerCase()) {
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
  const data = query(props);
  if (!data) {
    return notFound();
  }
  return metadataPage(data);
};

const Page: React.FC<Props> = (props) => {
  const data = query(props);
  if (!data) {
    return notFound();
  }
  const Component = layouts.post;
  return <Component data={data.data} prev={data.prev} next={data.next} />;
};

export default Page;
