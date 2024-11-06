import { Application } from "$oak";
import { env } from "#common/utils/environment.ts";
import { timing } from "./middlewares/timing.ts";
import { logger } from "./middlewares/logger.ts";
import { userRouter } from "./modules/user/routes.ts";

const port = Number(env("API_COMMON_PORT"));

const app = new Application();

// logger
app.use(logger);

// timing
app.use(timing);

// routes
app.use(userRouter.routes());

app.use((ctx) => {
  ctx.response.body = "Hello World from api-common!";
});

await app.listen({ port });
