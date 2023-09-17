import React from "react";
import { fetcher } from "../../../contents";

export const Projects: React.FC = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = await fetcher.projects();
  return null;
};
