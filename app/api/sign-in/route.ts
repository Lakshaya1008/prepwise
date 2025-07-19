import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/lib/actions/auth.action";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, idToken } = await req.json();
    const result = await signIn({ email, idToken });
    if (!result?.success) {
      return NextResponse.json({ success: false, message: result?.message || "Sign in failed" }, { status: 401 });
    }

    // Read the session cookie set by the server action
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    const res = NextResponse.json({ success: true });
    if (sessionCookie) {
      res.cookies.set({
        name: "session",
        value: sessionCookie.value,
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    }
    return res;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
} 