import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getToken } = await auth();
    const token = await getToken({ template: "wpguard-jwt" });
    
    if (!token) {
      return NextResponse.json({ error: "No token available" }, { status: 401 });
    }
    
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json(
      { error: "Failed to fetch token" },
      { status: 500 }
    );
  }
}
