import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Session } from "express-session";
import { Request, Response } from "express";
import { Redis } from "ioredis";

declare module "express-session" {
  interface Session {
    userId: number;
  }
}

export type MyContext = {
  emFork: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Session };
  res: Response;
  redisClient: Redis;
};
