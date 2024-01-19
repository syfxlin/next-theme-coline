import React from "react";
import { Metadata } from "next";
import { metadata as generateMetadata } from "../../layouts/root/metadata";
import { TemplatePage, TemplatePageProps } from "./default";

export async function metadataPage(props: TemplatePageProps): Promise<Metadata> {
  return generateMetadata({
    link: props.data.link,
    title: props.data.title,
    description: props.data.body.excerpts,
    thumbnail: props.data.thumbnail,
  });
}

export const layouts: Record<string, React.ComponentType<any>> = {
  post: TemplatePage,
  page: TemplatePage,
};
