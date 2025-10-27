import Fastify from "fastify";
import { greet } from "common";

const fastify = Fastify({ logger: true });

// Health check endpoint
fastify.get("/health", async (request, reply) => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

// Example endpoint using the common package
fastify.get("/greet/:name", async (request, reply) => {
  const { name } = request.params as { name: string };
  return { message: greet(name) };
});

// Main route
fastify.get("/", async (request, reply) => {
  return {
    message: "Welcome to Stingy Web Service",
    version: "1.0.0",
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    console.log("🚀 Web service is running on http://localhost:3001 !!!");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
