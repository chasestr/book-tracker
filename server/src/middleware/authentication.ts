import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const authenticate: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated");
  }
  return next();
};
