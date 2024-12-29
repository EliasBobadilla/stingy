import { deleteOtp, findOtpByEmail } from "@repo/common/models/otp";
import { findUserByEmail, updateUserByEmail } from "@repo/common/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const dto = await req.json(); // TODO: Add DTO validation

    console.log("########### --> Otp DTO", dto);

    const [existingUser, otp] = await Promise.all([
      findUserByEmail(dto),
      findOtpByEmail(dto),
    ]);

    // Check user
    if (!existingUser) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 404 }
      );
    }

    if (existingUser.validated) {
      return NextResponse.json(
        { error: "User already validated" },
        { status: 409 }
      );
    }

    // Check otp
    if (!otp) {
      return NextResponse.json(
        { error: "One time password does not exists" },
        { status: 404 }
      );
    }

    if (
      existingUser.email !== otp.email ||
      existingUser.id !== otp.id ||
      dto.otp !== otp.otp
    ) {
      return NextResponse.json(
        { error: "Invalid One time password" },
        { status: 400 }
      );
    }

    // at this point the otp code is valid
    await Promise.all([
      updateUserByEmail(dto.email, { validated: true }),
      deleteOtp(dto.email),
    ]);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("#### --> Registering ERROR", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
