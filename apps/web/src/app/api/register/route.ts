import { userDtoSchema } from "@repo/common/dtos/user";
import { logger } from "@repo/common/utils/logger";
import { getValidatedDto } from "@repo/common/utils/validate";
import { addOtp, otpSchema } from "@repo/common/models/otp";
import { addUser, userSchema } from "@repo/common/models/user";
import { json } from "@/lib/server/response";
import { sendOtpTemplate } from "@/lib/whatsapp/send-template";
import { getLanguage } from "@/lib/server/request";
import type { User } from "@repo/common/types/user";
import { getDbClient } from "@repo/common/models/db";
import { Otp } from "@repo/common/types/otp";

export async function POST(req: Request) {
  try {
    const [language, dto, userClient, otpClient] = await Promise.all([
      getLanguage(),
      getValidatedDto(req, userDtoSchema),
      getDbClient<User>(userSchema),
      getDbClient<Otp>(otpSchema),
    ]);

    //create user
    const user = await addUser(userClient, dto, true);

    if (user.validated) {
      throw new Error("User is already validated");
    }

    // create otp
    const otp = await addOtp(otpClient, user);

    // send otp
    await sendOtpTemplate(user.phone, language, otp.code);

    // destroy clients
    userClient.dispose();
    otpClient.dispose();

    return json(true, { email: user.email, id: user.id }, 201);
  } catch (error) {
    logger.error(error);
    return json(false);
  }
}
