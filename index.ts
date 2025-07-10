import { serve } from "bun";

import { usersTable } from './src/db/schema';
import { db } from "./src/db/client";


const server = serve({
  port: process.env.PORT || 3000,
  development: {
    hmr: true,
    console: true,
  },
  websocket: {
    message(ws) {
      server.publish("chat", "Hello everyone!");
    },
  },
  routes: {
    "/": async () => {
      const users = await db.select().from(usersTable);

      return Response.json({ users });
    },
    "/api/users": async (req) => {
      /*
      const user: typeof usersTable.$inferInsert = {
        name: "John Doe",
        age: 20,

        email: "john.doe@example.com",
      };
      await db.insert(usersTable).values(user);

      */
      const users = await db.select().from(usersTable);

      return Response.json({ users });
    },
  },
});

