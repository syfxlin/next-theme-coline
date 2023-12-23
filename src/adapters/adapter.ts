import { NextRequest, NextResponse } from "next/server";

export type AdapterResponse<P = any, D = any, E = any> = {
  params: P;
  loading: boolean;
  data: D | undefined;
  error: E | undefined;
};

export abstract class Adapter<P = any, R = any> {
  public abstract valid(params: P): Promise<string | null | undefined> | string | null | undefined;

  public abstract query(params: P): Promise<R> | R;

  public async route(request: NextRequest): Promise<NextResponse> {
    try {
      const params = await request.json();
      const error = this.valid(params);
      if (typeof error !== "string" || !error) {
        const data = await this.query(params);
        return NextResponse.json(data);
      } else {
        return NextResponse.json({ code: 400, message: `Illegal parameters. cause=${error}` }, { status: 400 });
      }
    } catch (e: any) {
      const code = e.code ?? 500;
      const message = e.message ?? "Internal Server Error";
      return NextResponse.json({ code, message }, { status: code });
    }
  }

  public async component(params: P): Promise<AdapterResponse<P, R>> {
    try {
      const error = this.valid(params);
      if (typeof error !== "string" || !error) {
        const data = await this.query(params);
        return {
          params,
          data,
          error: undefined,
          loading: false,
        };
      } else {
        return {
          params,
          data: undefined,
          error: { code: 400, message: `Illegal parameters. cause=${error}` },
          loading: false,
        };
      }
    } catch (e: any) {
      const code = e.code ?? 500;
      const message = e.message ?? "Internal Server Error";
      return {
        params,
        data: undefined,
        error: { code, message },
        loading: false,
      };
    }
  }
}

export class AdapterError extends Error {
  constructor(
    public readonly code: number,
    public readonly message: string,
  ) {
    super(message);
  }
}
