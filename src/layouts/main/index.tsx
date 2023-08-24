import React from "react";
import { ClientMain, ClientMainProps } from "../../components/layout/main";

export const Main: React.FC<ClientMainProps> = (props) => <ClientMain>{props.children}</ClientMain>;
