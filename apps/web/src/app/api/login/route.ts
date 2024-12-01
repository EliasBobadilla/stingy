import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { findUser } from "@repo/common/models/user";
import { createSession, defaultExpiration } from "@/app/lib/session";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await findUser({
    email,
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Prepare the session payload
  const { id, name, email: userEmail, role } = user;
  const sessionPayload = {
    userId: id,
    name,
    email: userEmail,
    role,
    expiresAt: defaultExpiration(),
  };

  // Create a session
  await createSession(sessionPayload);

  // Return user details (without password)
  const userWithoutPassword = {...user}
  delete userWithoutPassword.password;

  return NextResponse.json(
    userWithoutPassword,
    { status: 200 }
  );
}
