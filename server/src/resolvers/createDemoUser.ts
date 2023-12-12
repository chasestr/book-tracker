// import { Ctx, Mutation, Resolver } from "type-graphql";
// import { MyContext } from "../types";
// import { ds } from "..";
// import { User } from "../entities/User";
// import { v4 } from "uuid";
// import argon2 from "argon2";
// import { Book } from "../entities/Book";

// @Resolver()
export class DemoResolver {
  //   @Mutation()
  //   async createDemoUser(@Ctx() { req }: MyContext) {
  //     const uuid = v4();
  //     const userRes = await ds
  //       .createQueryBuilder()
  //       .insert()
  //       .into(User)
  //       .values({
  //         username: `demo+${uuid}`,
  //         email: `demo+${uuid}@story-stash`,
  //         password: await argon2.hash(uuid),
  //       })
  //       .returning("*")
  //       .execute();
  //     const user = userRes.raw[0];
  //     await ds
  //       .createQueryBuilder()
  //       .insert()
  //       .into(Book)
  //       .values(testBookData)
  //       .execute();
  //     await ds
  //       .createQueryBuilder()
  //       .insert()
  //       .into(ReadingLog)
  //       .values(testLogData)
  //       .execute();
  //   }
}
