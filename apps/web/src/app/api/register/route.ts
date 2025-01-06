import { userDtoSchema } from "@repo/common/dtos/user-dto";
import { logger } from "@repo/common/utils/logger";
import { getValidatedDto } from "@repo/common/utils/validate";
import { getOtpModel } from "@repo/common/models/otp-model";
import { getUserModel } from "@repo/common/models/user-model";
import { json } from "@/lib/server/response";
import { sendOtpTemplate } from "@repo/common/utils/whatsapp/send-template";
import { getLanguage } from "@/lib/server/request";

export async function POST(req: Request) {
  try {
    const [language, dto, userClient, otpClient] = await Promise.all([
      getLanguage(),
      getValidatedDto(req, userDtoSchema),
      getUserModel(),
      getOtpModel(),
    ]);

    const user = await userClient.add(dto, true);

    if (user.validated) {
      throw new Error("User is already validated");
    }

    const otp = await otpClient.add(user);
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
