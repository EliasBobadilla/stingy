import { Router } from "$oak";

const movies = new Map<string, any>();

movies.set("1", {
  id: "1",
  title: "Route Demo",
  author: "Software Engineer #1",
});

movies.set("2", {
  id: "2",
  title: "Elias Bobadilla",
  author: "Software Engineer",
});

export const movieRouter = new Router();

movieRouter
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/movie", (context) => {
    context.response.body = Array.from(movies.values());
  })
  .get("/movie/:id", (context) => {
    if (movies.has(context?.params?.id)) {
      context.response.body = movies.get(context.params.id);
    }
  });