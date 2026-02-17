import { NextResponse } from "next/server";
import { getUserByUid, updateUser } from "@/lib/services/user-service";
import { z } from "zod/v4";

const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
});

// --- GET /api/user?uid=<firebaseUid> ---

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        { error: "Missing uid query parameter" },
        { status: 400 },
      );
    }

    const user = await getUserByUid(uid);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
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
    const { uid, ...rest } = body;

    if (!uid) {
      return NextResponse.json(
        { error: "Missing uid in request body" },
        { status: 400 },
      );
    }

    const parsed = UpdateUserSchema.safeParse(rest);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: z.prettifyError(parsed.error) },
        { status: 400 },
      );
    }

    await updateUser(uid, parsed.data);
    const updated = await getUserByUid(uid);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/user error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}
