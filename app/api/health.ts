import { NextRequest, NextResponse } from "next/server";
 
export async function GET(req: NextRequest) {
  const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
  return NextResponse.json({ vapi: token ? "ok" : "missing-token" });
} 