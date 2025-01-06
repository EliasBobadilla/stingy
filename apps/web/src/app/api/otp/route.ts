import { otpDtoSchema } from "@repo/common/dtos/otp-dto";
import { getOtpModel } from "@repo/common/models/otp-model";
import { getUserModel } from "@repo/common/models/user-model";
import { logger } from "@repo/common/utils/logger";
import { getValidatedDto } from "@repo/common/utils/validate";
import { json } from "@/lib/server/response";
import { getLanguage } from "@/lib/server/request";
import { sendWelcomeTemplate } from "@repo/common/utils/whatsapp/send-template";

export async function POST(req: Request) {
  try {
    const [language, dto, userClient, otpClient] = await Promise.all([
      getLanguage(),
      getValidatedDto(req, otpDtoSchema),
      getUserModel(),
      getOtpModel(),
    ]);

    const [otp, user] = await Promise.all([
      otpClient.get(dto),
      userClient.findOrThrow({ id: dto.userId }),
    ]);

    await Promise.all([
      userClient.updateById(otp.userId, { validated: true }),
      otpClient.deleteByEmail(dto.email),
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
