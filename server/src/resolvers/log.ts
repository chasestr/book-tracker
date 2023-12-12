import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { ReadingLog } from "../entities/ReadingLog";
import { authenticate } from "../middleware/authentication";
import { MyContext } from "../types";
import { ds } from "..";
import { User } from "../entities/User";
import { GraphQLError } from "graphql";
import { Book } from "../entities/Book";

@InputType()
export class LogInput {
  @Field()
  date: string;
  @Field(() => Int)
  bookId: number;
  @Field({ nullable: true })
  pagesRead?: number;
  @Field({ nullable: true })
  minutes?: number;
}

@ObjectType()
export class PaginatedLogs {
  @Field(() => [ReadingLog])
  logs: ReadingLog[];
  @Field()
  hasMore: boolean;
}

@Resolver(ReadingLog)
export class ReadingLogResolver {
  @FieldResolver(() => User)
  user(@Root() log: ReadingLog) {
    return User.findOneBy({ id: log.userId });
  }

  @FieldResolver(() => Book)
  book(@Root() log: ReadingLog) {
    return Book.findOneBy({ id: log.bookId });
  }

  @UseMiddleware(authenticate)
  @Query(() => PaginatedLogs)
  async userLogs(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedLogs> {
    const realLimit = Math.min(100, limit);
    const qb = ds
      .getRepository(ReadingLog)
      .createQueryBuilder()
      .where('"userId" = :id', { id: req.session.userId })
      .orderBy('"date"', "DESC")
      .addOrderBy('"id"', "DESC")
      .take(realLimit + 1);
    if (cursor) {
      const [cursorDate, cursorId] = cursor.split("_");
      qb.andWhere(
        '("date" < :cursorDate OR ("date" = :cursorDate AND "id" < :cursorId))',
        {
          cursorDate,
          cursorId,
        }
      );
    }

    const logs = await qb.getMany();

    return {
      logs: logs.slice(0, realLimit),
      hasMore: logs.length === realLimit + 1,
    };
  }

  @UseMiddleware(authenticate)
  @Query(() => PaginatedLogs)
  async bookLogs(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Arg("bookId", () => Int) bookId: number
  ): Promise<PaginatedLogs> {
    const realLimit = Math.min(100, limit);
    const qb = ds
      .getRepository(ReadingLog)
      .createQueryBuilder()
      .where('"bookId" = :id', { id: bookId })
      .orderBy('"date"', "DESC")
      .addOrderBy('"id"', "DESC")
      .take(realLimit + 1);
    if (cursor) {
      const [cursorDate, cursorId] = cursor.split("_");
      qb.andWhere(
        '("date" < :cursorDate OR ("date" = :cursorDate AND "id" < :cursorId))',
        {
          cursorDate,
          cursorId,
        }
      );
    }

    const logs = await qb.getMany();

    return {
      logs: logs.slice(0, realLimit),
      hasMore: logs.length === realLimit + 1,
    };
  }

  @Query(() => ReadingLog, { nullable: true })
  log(@Arg("id", () => Int) id: number): Promise<ReadingLog | null> {
    return ReadingLog.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        book: true,
      },
    });
  }

  @Mutation(() => ReadingLog)
  @UseMiddleware(authenticate)
  async createLog(
    @Arg("input") input: LogInput,
    @Ctx() { req }: MyContext
  ): Promise<ReadingLog> {
    const user = await User.findOne({
      where: {
        id: req.session.userId,
      },
    });
    if (!user) {
      throw new GraphQLError("Unable to find user", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    }
    return ReadingLog.create({
      ...input,
      user: user,
    }).save();
  }

  @Mutation(() => ReadingLog, { nullable: true })
  @UseMiddleware(authenticate)
  async updateLog(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number,
    @Arg("input") input: LogInput
  ): Promise<ReadingLog | null> {
    const log = await ds
      .getRepository(ReadingLog)
      .createQueryBuilder()
      .update(ReadingLog)
      .set({ ...input })
      .where('id = :id and "userId" = :userId', {
        id,
        userId: req.session.userId,
      })
      .returning("*")
      .execute();

    return log.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticate)
  async deleteLog(@Arg("id", () => Int) id: number): Promise<boolean> {
    const deleted = await ReadingLog.delete({
      id,
    });
    if (!deleted) {
      return false;
    }
    return true;
  }
}
