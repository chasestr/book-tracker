import { Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "../types";
import { ds } from "..";
import { User } from "../entities/User";
import { v4 } from "uuid";
import argon2 from "argon2";
import { Book } from "../entities/Book";
import { bookData, logData } from "../demoData";
import { ReadingLog } from "../entities/ReadingLog";
import { getEnv } from "../config";
import { GraphQLError } from "graphql";

@Resolver()
export class DemoResolver {
  @Mutation(() => Boolean)
  async createDemoUser(@Ctx() { req }: MyContext) {
    return new Promise(async (resolve) => {
      const uuid = v4();
      const userRes = await ds
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: `demo${uuid}`,
          email: `demo${uuid}@story-stash`,
          password: await argon2.hash(`demo${getEnv("DEMO_PASS")}`),
        })
        .returning("*")
        .execute();
      const user = userRes.raw[0];

      if (!user) {
        resolve(false);
        throw new GraphQLError("Demo user not created.", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }

      req.session.userId = user.id;

      const books = await bookData(user.id);
      const insertedBooks = await Book.save(books);

      const generatedIds = insertedBooks.map((book) => book.id);

      const logs = await logData(generatedIds, user.id);

      await ReadingLog.save(logs);

      resolve(true);
    });
  }
}
