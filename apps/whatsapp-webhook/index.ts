import { Application } from "$oak";
import { env } from "../../common/utils/environment.ts"

const port = Number(env("WHATSAPP_WEBHOOK_PORT"));

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World from whatsapp-webhook!";
});

await app.listen({ port });