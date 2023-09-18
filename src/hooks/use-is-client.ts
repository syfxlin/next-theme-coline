import { useEffect, useState } from "react";

export const useIsClient = () => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  return client;
};
