import React from "react";
import { fetcher } from "../../../contents";
import { FriendsInner } from "./inner";

export const Friends: React.FC = async () => {
  const data = await fetcher.friends();
  return <FriendsInner data={data} />;
};
