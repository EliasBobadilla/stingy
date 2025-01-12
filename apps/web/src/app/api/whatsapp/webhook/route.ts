import { logger } from "@repo/common/utils/logger";
import { config } from "@repo/common/utils/config";
import { json } from "@/lib/server/response";
import type { WhatsappMsgDto } from "@repo/common/dtos/whatsapp-dto";
import { getUserModel } from "@repo/common/models/user-model";
import { getWhatsappModel } from "@repo/common/models/whatsapp-model";
import { hasAtLeast } from "remeda";

export async function GET(req: Request) {
  try {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);

    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === config.whatsappVerifyToken) {
      // return challenge as text
      return new Response(challenge, {
        status: 200,
      });
    } else {
      json(false, { error: "Verify token does not match." }, 403);
    }
  } catch (error) {
    logger.error(error);
    return json(false);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const messages: WhatsappMsgDto[] =
      body.entry?.[0]?.changes[0]?.value?.messages ?? body.value?.messages;

    const [userClient, whatsappClient] = await Promise.all([
      getUserModel(),
      getWhatsappModel(),
    ]);

    if (hasAtLeast(messages, 1)) {
      const user = await userClient.findOrThrow({ phone: messages[0].from });
      await Promise.all(
        messages.map((m) =>
          whatsappClient.addMessage(user, m.type, m.text.body),
        ),
      );
    }

    userClient.dispose();
    whatsappClient.dispose();

    return json(true);
  } catch (error) {
    logger.error(error);
    return json(false);
  }
}
