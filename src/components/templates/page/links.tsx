import React from "react";
import { fetcher } from "../../../contents";
import { Renderer } from "../../docs";
import { Friends } from "../../widgets/friends/dynamic";
import { TemplatePage, TemplatePageProps } from "./template";

export const LinksTemplatePage: React.FC<Omit<TemplatePageProps, "children">> = async (props) => {
  const friends = await fetcher.friends();
  return (
    <TemplatePage data={props.data} prev={props.prev} next={props.next}>
      <Friends data={friends} />
      <Renderer document={props.data.body.document} />
    </TemplatePage>
  );
};
