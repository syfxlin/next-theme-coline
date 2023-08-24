import React from "react";
import { ClientHeader } from "../../components/layout/header";
import { header, seo } from "../../contents";

export const Header: React.FC = () => <ClientHeader seo={seo} header={header} />;
