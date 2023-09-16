import React from "react";
import { Metadata } from "next";
import { metadata as generateMetadata } from "../../layouts/root/metadata";
import { DefaultTemplatePage } from "./default";
import { LinksTemplatePage } from "./links";
import { TemplatePageProps } from "./template";

export const metadataPage = async (props: Omit<TemplatePageProps, "children">): Promise<Metadata> => {
  return generateMetadata({
    link: props.data.link,
    title: props.data.title,
    description: props.data.body.excerpts,
    thumbnail: props.data.thumbnail,
  });
};

export const layouts: Record<string, React.ComponentType<any>> = {
  post: DefaultTemplatePage,
  page: DefaultTemplatePage,
  links: LinksTemplatePage,
};
