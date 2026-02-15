import { NextResponse } from "next/server";
import { CookHubData } from "@/lib/data";
import { z } from "zod/v4";

const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  avatar: z.string().optional(),
});

// --- GET /api/user ---

export async function GET() {
  try {
    return NextResponse.json(CookHubData.user);
  } catch (error) {
    console.error("GET /api/user error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

// --- PUT /api/user ---

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = UpdateUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: z.prettifyError(parsed.error) },
        { status: 400 },
      );
    }

    Object.assign(CookHubData.user, parsed.data);
    return NextResponse.json(CookHubData.user);
  } catch (error) {
    console.error("PUT /api/user error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}
