import { Router } from "$oak";
import { deleteUser, getUser, addUser, updateUser } from "./handler.ts";

export const userRouter = new Router();

userRouter
  .get("/user/:id", async (context) => {
    const params = context.params;
    // const searchParams = context.request.url.searchParams;
    context.response.body = await getUser(params);
  })
  .post("/user", async (context) => {
    const user = await context.request.body.json();
    context.response.body = await addUser(user);
  })
  .put("/user", async (context) => {
    const user = await context.request.body.json();
    context.response.body = await updateUser(user);
  })
  .delete("/user/:id", async (context) => {
    const { id, email } = context.params;
    context.response.body = await deleteUser({ id, email });
  });


  // TODO: response type