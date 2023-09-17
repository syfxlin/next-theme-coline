import React from "react";
import { Renderer } from "../../docs";
import { ArticleData } from "../../../contents/types";
import { Template } from "../template";
import { Image } from "../../ui/image";
import { AspectRatio } from "../../ui/aspect-ratio";
import { MetaInfo } from "../../layouts/meta-info";
import { Copyright } from "../../widgets/copyright";

export type TemplatePageProps = {
  data: ArticleData;
  prev?: {
    name: string;
    link: string;
  };
  next?: {
    name: string;
    link: string;
  };
};

export const TemplatePage: React.FC<TemplatePageProps> = async ({ data, prev, next }) => {
  return (
    <Template
      name={data.title}
      slug={data.slug}
      desc={<MetaInfo data={data} />}
      artalk={true}
      headings={data.body.headings}
      pagination={{ prev, next }}
      before={
        <>
          {data.thumbnail && (
            <AspectRatio ratio={16 / 9}>
              <Image src={data.thumbnail} alt={`缩略图：${data.title}`} />
            </AspectRatio>
          )}
        </>
      }
    >
      <Renderer document={data.body.document} />
      {data.layout === "post" && <Copyright data={data} />}
    </Template>
  );
};
