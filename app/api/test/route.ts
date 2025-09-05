import { NextResponse } from "next/server";

import isdev from "@/utils/functions/isDev";

export const GET = async () => {
  if (!isdev) return NextResponse.json({ message: "Only available in dev mode" }, { status: 404 });
  return NextResponse.json({ message: "Hello World" });
};
