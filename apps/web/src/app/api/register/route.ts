import { addUser, findUser } from "@/models/user";
import { assertSome } from "@repo/common/utils/validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ulid } from "ulid";

const JWT_SECRET = process.env.AUTH_SECRET;

export async function POST(req: Request) {
  assertSome(JWT_SECRET, "process.env.AUTH_SECRET")

  const { name, email, password } = await req.json();

  // Check if the user already exists
  const existingUser = await findUser({
    email,
  });
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
  };

  try {
    await addUser(user);

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" } // Token expiration time
    );

    return NextResponse.json(
      { message: "User registered successfully", token, user },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
