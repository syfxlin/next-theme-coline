import React from "react";
import { author, footer, seo } from "../../contents";
import { ClientFooter } from "../../components/layout/footer";

export const Footer: React.FC = () => <ClientFooter seo={seo} author={author} footer={footer} />;
