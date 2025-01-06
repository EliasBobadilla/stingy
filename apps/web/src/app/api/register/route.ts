import { UserDto, userDtoSchema } from "@repo/common/dtos/user";
import { logger } from "@repo/common/utils/logger";
import { validateType } from "@repo/common/utils/validate";
import { addOtp } from "@repo/common/models/otp";
import { addUser, findUserByEmail } from "@repo/common/models/user";
import bcrypt from "bcrypt";
import { ulid } from "ulid";
import { json, JsonBodyResponse } from "@/lib/server/response";
import { sendOtpTemplate } from "@/lib/whatsapp/send-template";
import { getLanguage } from "@/lib/server/request";
import { expireAt, random4 } from "@repo/common/utils/math";
import { User } from "@repo/common/types/user";

export async function POST(req: Request) {
  try {
    const language = await getLanguage();
    const dto = await req.json();

    const validatedReq = await validateRequest(dto);

    if (!validatedReq.success) {
      return json(false, validatedReq);
    }

    // build new user
    const user = validatedReq.user ?? {
      ...dto,
      id: ulid(),
      password: await bcrypt.hash(dto.password, 10),
      role: "admin", // TODO: hardcoding the role for now
      workspaces: ["demo"], // TODO: hardcoding the workspace for now
    };

    // build new otp object
    const otpCode = {
      email: user.email,
      expireAt: expireAt(10),
      id: ulid(),
      otp: random4(),
      userId: user.id,
    };

    await Promise.all([
      addUser(user, true),
      addOtp(otpCode),
      sendOtpTemplate(user.phone, language, otpCode.otp),
    ]);

    return json(true, { email: user.email, id: user.id }, 201);
  } catch (error) {
    logger.error(error);
    return json(false);
  }
}

async function validateRequest(
  dto: UserDto
): Promise<JsonBodyResponse & { user?: User }> {
  const isValid = validateType(userDtoSchema, dto);

  // check if dto is valid
  if (!isValid) {
    return {
      code: 400,
      error: "Invalid request",
      success: false,
    };
  }

  const user = await findUserByEmail(dto);

  // check if user exists and allow resending the otp code to the user who is already registered but not validated
  if (user) {
    if (user.validated) {
      return {
        code: 400,
        error: "User is already validated",
        success: false,
      };
    } else {
      return {
        code: 200,
        success: true,
        user,
      };
    }
  }

  return {
    code: 200,
    success: true,
  };
}
