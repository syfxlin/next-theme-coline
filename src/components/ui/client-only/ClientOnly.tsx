"use client";

import React, { ReactNode } from "react";
import { useIsClient } from "../../../hooks/use-is-client";

export type ClientOnlyProps = {
  children: ReactNode;
};

export const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const client = useIsClient();
  return client ? <>{children}</> : null;
};
