import { useEffect, useState } from "react";

export function useIsClient() {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  return client;
}
