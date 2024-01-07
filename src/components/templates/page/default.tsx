import React from "react";
import { Renderer } from "../../docs";
import { ArticleData } from "../../../contents/types";
import { Template } from "../template";
import { Image } from "../../ui/image";
import { AspectRatio } from "../../ui/aspect-ratio";
import { MetaInfo } from "../../layouts/meta-info";
import { Copyright } from "../../widgets/copyright";
import { t } from "../../../locales";

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
      link={data.link}
      desc={<MetaInfo data={data} />}
      artalk={true}
      headings={data.body.headings}
      pagination={{ prev, next }}
      before={
        <>
          {data.thumbnail && (
            <AspectRatio ratio={16 / 9}>
              <Image src={data.thumbnail} alt={t("article.thumbnail")} />
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
