import React from "react";
import { ClientFooter } from "../../components/layout/footer";
import { fetcher } from "../../contents";

export const Footer: React.FC = async () => {
  const [seo, author, footer] = await Promise.all([fetcher.seo(), fetcher.author(), fetcher.footer()]);
  return <ClientFooter seo={seo} author={author} footer={footer} />;
};
