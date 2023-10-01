import { AdapterResponse } from "./adapter";
import useSWR from "swr";
import { useMemo } from "react";

export const fetcher = async <P = any, R = any>([path, params]: [string, P]): Promise<R> => {
  const url = new URL(path, location.href);
  const response = await fetch(url, { method: "POST", body: JSON.stringify(params) });
  return await response.json();
};

export const useAdapter = <P = any, R = any>(path: string, params: P): AdapterResponse<P, R> => {
  // @ts-ignore
  const query = useSWR<R>([path, params], fetcher);
  return useMemo(
    () => ({
      params: params,
      data: query.data,
      error: query.error,
      loading: query.isLoading,
    }),
    [params, query.data, query.error, query.isLoading],
  );
};
