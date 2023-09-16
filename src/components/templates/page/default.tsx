import React from "react";
import { Renderer } from "../../docs";
import { TemplatePage, TemplatePageProps } from "./template";

export const DefaultTemplatePage: React.FC<Omit<TemplatePageProps, "children">> = async (props) => {
  return (
    <TemplatePage data={props.data} prev={props.prev} next={props.next}>
      <Renderer document={props.data.body.document} />
    </TemplatePage>
  );
};
