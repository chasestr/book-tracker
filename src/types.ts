import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Session } from "express-session";
declare module "express-session" {
  interface Session {
    userId: number;
  }
}

export type MyContext = {
  emFork: EntityManager<IDatabaseDriver<Connection>>;
  req: Express.Request & { session: Session };
  res: Express.Response;
};
