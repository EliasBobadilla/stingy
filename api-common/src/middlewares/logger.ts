import type { Context, Next } from "$oak";

export const logger = async (ctx: Context, next: Next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
};
