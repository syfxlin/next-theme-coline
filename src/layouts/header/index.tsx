import React from "react";
import { ClientHeader } from "../../components/layout/header";
import { fetcher } from "../../contents";

export const Header: React.FC = async () => {
  const [seo, header] = await Promise.all([fetcher.seo(), fetcher.header()]);
  return <ClientHeader seo={seo} header={header} />;
};
