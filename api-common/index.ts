import { Application } from "$oak";
import { env } from "../common/utils/environment.ts"

const port = Number(env("API_COMMON_PORT"));
const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World from api-common!";
});

await app.listen({ port });