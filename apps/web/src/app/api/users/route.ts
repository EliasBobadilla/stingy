import { NextResponse } from "next/server";

import { findUsers } from "@repo/common/models/user";

export async function GET() {
  try {
    const users = await findUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
