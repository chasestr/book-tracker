import { Session } from "express-session";
import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createUserLoader } from "./dataloaders/User";

declare module "express-session" {
  interface Session {
    userId: number;
  }
}

export type MyContext = {
  req: Request & { session: Session };
  res: Response;
  redisClient: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
};
