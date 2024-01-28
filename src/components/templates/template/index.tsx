import React, { PropsWithChildren, ReactNode } from "react";
import { TocData } from "@syfxlin/reks";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { Title } from "../../layouts/title";
import { Toc } from "../../widgets/toc";
import { TwoPagination } from "../../ui/pagination";
import { Artalk } from "../../widgets/artalk";
import { Footer } from "../../layouts/footer";

export type TemplateProps = PropsWithChildren<{
  name: string;
  link: string;
  desc?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  headings?: ReadonlyArray<TocData>;
  artalk?: boolean;
  pagination?: {
    prev?: {
      name: string;
      link: string;
    };
    next?: {
      name: string;
      link: string;
    };
  };
}>;

export const Template: React.FC<TemplateProps> = async (props) => {
  return (
    <>
      <Header />
      <Main>
        {props.before}
        <Title title={props.name}>{props.desc}</Title>
        <article>{props.children}</article>
        {props.after}
        {props.headings && <Toc data={props.headings} />}
        {(props.pagination?.prev || props.pagination?.next) && (
          <TwoPagination prev={props.pagination.prev} next={props.pagination.next} />
        )}
        {props.artalk && <Artalk name={props.name} link={props.link} />}
      </Main>
      <Footer />
    </>
  );
};
