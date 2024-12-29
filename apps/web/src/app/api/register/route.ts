import { addUser, findUserByEmail } from "@repo/common/models/user";
import bcrypt from "bcrypt";
import { addOtp } from "@repo/common/models/otp";
import { NextResponse } from "next/server";
import { ulid } from "ulid";
import { User } from "@repo/common/types/user";

export async function POST(req: Request) {
  try {
    const dto = await req.json(); // TODO: Add DTO validation with ZOD
    const existingUser = await findUserByEmail(dto);

    // user is already registered
    if (existingUser) {
      if (existingUser.validated) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 409 }
        );
      }
      // resent the code to the user who is already registered but not validated
      await sendOtp(existingUser);
      return NextResponse.json(
        { id: existingUser.id, email: existingUser.email },
        { status: 200 }
      );
    }

    // Hash the password
    const password = await bcrypt.hash(dto.password, 10);
    const createdAt = Math.floor(new Date().getTime() / 1000);

    // Create a new user
    const user = {
      id: ulid(),
      name: dto.name,
      email: dto.email,
      password,
      phone: dto.phone,
      validated: false,
      role: "admin", // TODO: hardcoding the role for now
      workspaces: ["demo"], // TODO: hardcoding the workspace for now
      createdAt: createdAt.toString(),
    };

    await Promise.all([addUser(user), sendOtp(user)]);

    return NextResponse.json(
      { id: user.id, email: user.email },
      { status: 201 }
    );
  } catch (error) {
    console.log("#### --> Registering ERROR", error); // TODO: Add logging
    return NextResponse.json({ error }, { status: 500 });
  }
}

async function sendOtp(user: User) {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const opt = {
    id: user.id,
    email: user.email,
    otp: (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString(),
    createdAt: currentTime.toString(),
    expireAt: Math.floor(new Date().getTime() + 10 * 60 * 1000).toString(), // Expire in 10 minutes
  };

  console.log("#### [[ OTP CODE ]] #### -->", opt); // TODO: Add logging

  // TODO: send otp through WhatsApp
  await addOtp(opt);
}
