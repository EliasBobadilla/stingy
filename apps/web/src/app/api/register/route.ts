import { addUser, findUserByEmail } from "@repo/common/models/user";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";
import { ulid } from "ulid";

export async function POST(req: Request) {
  try {
    const dto = await req.json(); // TODO: Add DTO validation

    // Check if the user already exists
    const existingUser = await findUserByEmail(dto);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const password = await bcrypt.hash(dto.password, 10);

    // Create a new user
    const user = {
      id: ulid(),
      name: dto.name,
      email: dto.email,
      password,
      role: "admin", // TODO: hardcoding the role for now
      workspaces: ["demo"], // TODO: hardcoding the workspace for now
    };
    await addUser(user);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
