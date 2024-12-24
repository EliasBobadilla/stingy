import { addUser, findUser } from "@repo/common/models/user";
import { Config } from "@repo/common/utils/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ulid } from "ulid";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Check if the user already exists
  const existingUser = await findUser({
    email,
  });

  console.log("@@@@@@@ [existingUser] -->", existingUser);

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = {
    id: ulid(),
    name,
    email,
    password: hashedPassword,
    role: "admin",
    image:
      "https://img.freepik.com/premium-vector/user-profile-icon-vector-1_666870-1779.jpg",
    workspaces: ["demo"],
  };

  try {
    await addUser(user);

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      Config.jwtSecret,
      { expiresIn: "30d" }, // Token expiration time
    );

    return NextResponse.json(
      { message: "User registered successfully", token, user },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
