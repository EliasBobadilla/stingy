import { userDtoSchema } from "@/lib/dto/user";
import { logger } from "@/lib/logger";
import { isValidDto } from "@/lib/utils/validate";
import { addOtp } from "@repo/common/models/otp";
import { addUser, findUserByEmail } from "@repo/common/models/user";
import { User } from "@repo/common/types/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { ulid } from "ulid";

export async function POST(req: Request) {
  try {
    const dto = await req.json();
    const isValid = isValidDto(userDtoSchema, dto);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

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
        { email: existingUser.email, id: existingUser.id },
        { status: 200 }
      );
    }

    // Hash the password
    const password = await bcrypt.hash(dto.password, 10);

    // Create a new user
    const user = {
      email: dto.email,
      id: ulid(),
      name: dto.name,
      password,
      phone: dto.phone.toString(),
      role: "admin", // TODO: hardcoding the role for now
      validated: false,
      workspaces: ["demo"], // TODO: hardcoding the workspace for now
    };

    await Promise.all([addUser(user), sendOtp(user)]);

    return NextResponse.json(
      { email: user.email, id: user.id },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Register", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

async function sendOtp(user: User) {
  const opt = {
    email: user.email,
    expireAt: Math.floor(new Date().getTime() + 10 * 60 * 1000).toString(),
    id: user.id,
    otp: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000, // Expire in 10 minutes
  };

  logger.debug("Otp code", opt);
  // TODO: send otp through WhatsApp
  await addOtp(opt);
}
