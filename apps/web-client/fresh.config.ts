import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { env } from "#common/utils/environment.ts"

const port = Number(env("WEB_CLIENT_PORT"));

export default defineConfig({
  plugins: [tailwind()],
  server: {
    port
},
});
