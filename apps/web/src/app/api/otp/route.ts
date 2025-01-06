import { OtpDto, otpDtoSchema } from "@repo/common/dtos/otp";
import { deleteOtpByEmail, findValidOtp } from "@repo/common/models/otp";
import { findUserByEmail, updateUserByEmail } from "@repo/common/models/user";
import { logger } from "@repo/common/utils/logger";
import { validateType } from "@repo/common/utils/validate";
import { json, JsonBodyResponse } from "@/lib/server/response";

export async function POST(req: Request) {
  try {
    const dto = await req.json();
    const validatedReq = await validateRequest(dto);

    if (!validatedReq.success) {
      return json(false, validatedReq);
    }

    await Promise.all([
      updateUserByEmail(dto.email, { validated: true }),
      deleteOtpByEmail(dto.email),
    ]);

    return json(true);
  } catch (error) {
    logger.error(error);
    return json(false);
  }
}

async function validateRequest(dto: OtpDto): Promise<JsonBodyResponse> {
  const isValid = validateType(otpDtoSchema, dto);

  // check if dto is valid
  if (!isValid) {
    return {
      code: 400,
      error: "Invalid request",
      success: false,
    };
  }

  // find saved user and otp
  const [user, otp] = await Promise.all([
    findUserByEmail(dto),
    findValidOtp(dto),
  ]);

  // check user exists
  if (!user) {
    return {
      code: 404,
      error: "User does not exists",
      success: false,
    };
  }

  // check if user is already validated
  if (user?.validated) {
    return {
      code: 409,
      error: "User already validated",
      success: false,
    };
  }

  // check otp exists
  if (!otp) {
    return {
      code: 404,
      error: "One time password does not exists",
      success: false,
    };
  }

  logger.debug("OTP", otp);
  logger.debug("USER", user);

  // check if otp is valid
  if (user.id !== otp.userId || dto.userId !== otp.userId) {
    return {
      code: 400,
      error: "Invalid One time password",
      success: false,
    };
  }

  return {
    code: 200,
    success: true,
  };
}
