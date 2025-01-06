import { SupportedLanguage } from "@/i18n/routing";
import { config } from "@repo/common/utils/config";
import { logger } from "@repo/common/utils/logger";

const SEND_TEMPLATE = "WhatsApp send template" as const;

type Component = {
  index?: number;
  parameters: Parameter[];
  sub_type?: string;
  type: string;
};

type Parameter = {
  text: string;
  type: string;
};

export async function sendWelcomeTemplate(
  to: string,
  language: SupportedLanguage,
  name: string
) {
  const components: Component[] = [
    {
      parameters: [
        {
          text: name,
          type: "text",
        },
      ],
      type: "body",
    },
    {
      index: 0,
      parameters: [
        {
          text: name,
          type: "text",
        },
      ],
      sub_type: "url",
      type: "button",
    },
  ];

  await sendTemplate(to, `welcome_template_${language}`, language, components);
}

export async function sendOtpTemplate(
  to: string,
  language: SupportedLanguage,
  otp: string
) {
  const components: Component[] = [
    {
      parameters: [
        {
          text: otp,
          type: "text",
        },
      ],
      type: "body",
    },
    {
      index: 0,
      parameters: [
        {
          text: otp,
          type: "text",
        },
      ],
      sub_type: "url",
      type: "button",
    },
  ];

  await sendTemplate(
    to,
    `verification_template_${language}`,
    language,
    components
  );
}

async function sendTemplate(
  to: string,
  template: string,
  language: SupportedLanguage,
  components: Component[]
) {
  const body = {
    messaging_product: "whatsapp",
    template: {
      components,
      language: {
        code: language,
      },
      name: template,
    },
    to,
    type: "template",
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${config.whatsappPhoneNumber}/messages`,
      {
        body: JSON.stringify(body),
        credentials: "include",
        headers: {
          Authorization: `Bearer ${config.whatsappToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    const data = await response.json();
    logger.debug(SEND_TEMPLATE, data);
    return true;
  } catch (error) {
    logger.error({ body, error }, SEND_TEMPLATE);
    return false;
  }
}
