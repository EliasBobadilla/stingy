import { otpDtoSchema } from "@repo/common/dtos/otp";
import {
  deleteOtpByEmail,
  getValidOtp,
  otpSchema,
} from "@repo/common/models/otp";
import {
  findUserById,
  updateUserById,
  userSchema,
} from "@repo/common/models/user";
import { logger } from "@repo/common/utils/logger";
import { assertSome, getValidatedDto } from "@repo/common/utils/validate";
import { json } from "@/lib/server/response";
import { getLanguage } from "@/lib/server/request";
import { getDbClient } from "@repo/common/models/db";
import { Otp } from "@repo/common/types/otp";
import type { User } from "@repo/common/types/user";
import { sendWelcomeTemplate } from "@/lib/whatsapp/send-template";

export async function POST(req: Request) {
  try {
    const [language, dto, userClient, otpClient] = await Promise.all([
      getLanguage(),
      getValidatedDto(req, otpDtoSchema),
      getDbClient<User>(userSchema),
      getDbClient<Otp>(otpSchema),
    ]);

    // get otp and user
    const [otp, user] = await Promise.all([
      getValidOtp(otpClient, dto),
      findUserById(userClient, dto.userId),
    ]);

    assertSome(otp);
    assertSome(user);

    await Promise.all([
      updateUserById(userClient, otp.userId, { validated: true }),
      deleteOtpByEmail(otpClient, dto.email),
      sendWelcomeTemplate(user.phone, language, user.name),
    ]);

    // destroy clients
    userClient.dispose();
    otpClient.dispose();

    return json(true);
  } catch (error) {
    logger.error(error);
    return json(false);
  }
}
