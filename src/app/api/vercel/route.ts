import fs from "fs-extra";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const dir = params.get("dir");
  const file = params.get("file");

  try {
    if (dir) {
      return NextResponse.json(await fs.readdir(path.resolve(dir)));
    }
    if (file) {
      return NextResponse.json(await fs.readFile(path.resolve(file)));
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e.message });
  }
};
