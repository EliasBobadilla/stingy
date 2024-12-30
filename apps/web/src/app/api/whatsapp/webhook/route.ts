import { logger } from "@/lib/logger";
import { config } from "@repo/common/utils/config";
import { NextResponse } from "next/server";

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
      return NextResponse.json(
        { error: "Verify token does not match." },
        { status: 403 }
      );
    }
  } catch (error) {
    logger.error("Register", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages =
      body.entry?.[0]?.changes[0]?.value?.messages ?? body.value?.messages;

    logger.info("WhatsApp messages =>", messages);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    logger.error("Register", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

/*
 [
  {
    from: '16315551181',
    id: 'ABGGFlA5Fpa',
    timestamp: '1504902988',
    type: 'text',
    text: { body: 'this is a text message' }
  }
]
*/
