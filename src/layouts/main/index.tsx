import React from "react";
import { ClientMain, ClientMainProps } from "../../components/layout/main";

export const Main: React.FC<ClientMainProps> = (props) => {
  return <ClientMain>{props.children}</ClientMain>;
};
