import { otpDtoSchema } from "@repo/common/dtos/otp";
import { deleteOtp, findOtpByEmail } from "@repo/common/models/otp";
import { findUserByEmail, updateUserByEmail } from "@repo/common/models/user";
import { logger } from "@repo/common/utils/logger";
import { NextResponse } from "next/server";
import { validateType } from "@repo/common/utils/validate";

export async function POST(req: Request) {
  try {
    const dto = await req.json();
    const isValid = validateType(otpDtoSchema, dto);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const [existingUser, otp] = await Promise.all([
      findUserByEmail(dto),
      findOtpByEmail(dto),
    ]);

    // Check user
    if (!existingUser) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 404 },
      );
    }

    if (existingUser.validated) {
      return NextResponse.json(
        { error: "User already validated" },
        { status: 409 },
      );
    }

    // Check otp
    if (!otp) {
      return NextResponse.json(
        { error: "One time password does not exists" },
        { status: 404 },
      );
    }

    if (
      existingUser.email !== otp.email ||
      existingUser.id !== otp.id ||
      dto.otp !== otp.otp
    ) {
      return NextResponse.json(
        { error: "Invalid One time password" },
        { status: 400 },
      );
    }

    // at this point the otp code is valid
    await Promise.all([
      updateUserByEmail(dto.email, { validated: true }),
      deleteOtp(dto.email),
    ]);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    logger.error("Otp", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
