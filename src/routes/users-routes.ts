import { Elysia, t } from "elysia";
import { registerUser } from "../services/users-service";

export const usersRoutes = new Elysia({ prefix: "/api/users" })
  .post("/", async ({ body, set }) => {
    try {
      const result = await registerUser(body);
      return { data: result };
    } catch (error) {
      const message = (error as Error).message;
      if (message === "Email sudah terdaftar") {
        set.status = 400;
        return { error: message };
      }
      set.status = 500;
      return { error: "Internal Server Error" };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    })
  });
