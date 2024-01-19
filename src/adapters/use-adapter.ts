import useSWR from "swr";
import { useMemo } from "react";
import { AdapterResponse } from "./adapter";

export async function fetcher<P = any, R = any>([path, params]: [string, P]): Promise<R> {
  const url = new URL(path, location.href);
  const response = await fetch(url, { method: "POST", body: JSON.stringify(params) });
  return await response.json();
}

export function useAdapter<P = any, R = any>(path: string, params: P): AdapterResponse<P, R> {
  // @ts-expect-error
  const query = useSWR<R>([path, params], fetcher);
  return useMemo(
    () => ({
      params,
      data: query.data,
      error: query.error,
      loading: query.isLoading,
    }),
    [params, query.data, query.error, query.isLoading],
  );
}
