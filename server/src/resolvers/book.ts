import { Book, BookStatus } from "../entities/Book";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Field,
  Ctx,
  UseMiddleware,
  Int,
  ObjectType,
  FieldResolver,
  Root,
} from "type-graphql";
import { MyContext } from "../types";
import { authenticate } from "../middleware/authentication";
import { ds } from "..";
import { User } from "../entities/User";
import { ReadingLog } from "../entities/ReadingLog";
import { GraphQLError } from "graphql";
import { BookInput } from "../types/BookInput";

@ObjectType()
export class PaginatedBooks {
  @Field(() => [Book])
  books: Book[];
  @Field()
  hasMore: boolean;
}

@Resolver(Book)
export class BookResolver {
  @FieldResolver(() => User)
  user(@Root() book: Book, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(book.userId);
  }

  @FieldResolver(() => [ReadingLog])
  logs(@Root() book: Book) {
    return ReadingLog.findBy({ bookId: book.id });
  }

  @UseMiddleware(authenticate)
  @Query(() => PaginatedBooks)
  async books(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedBooks> {
    const realLimit = Math.min(100, limit);
    const qb = ds
      .getRepository(Book)
      .createQueryBuilder()
      .leftJoinAndSelect("book.authors", "authors")
      .leftJoinAndSelect("book.categories", "categories")
      .where('"userId" = :id', { id: req.session.userId })
      .orderBy('"title"', "ASC")
      .take(realLimit + 1);
    if (cursor) {
      qb.andWhere('"title" > :cursor', { cursor });
    }

    const books = await qb.getMany();

    return {
      books: books.slice(0, realLimit),
      hasMore: books.length === realLimit + 1,
    };
  }

  @UseMiddleware(authenticate)
  @Query(() => Book, { nullable: true })
  book(@Arg("id", () => Int) id: number): Promise<Book | null> {
    return Book.findOne({
      where: {
        id,
      },
      relations: {
        authors: true,
        categories: true,
      },
    });
  }

  @UseMiddleware(authenticate)
  @Query(() => [Book])
  booksByStatus(
    @Arg("status", () => BookStatus) status: BookStatus,
    @Ctx() { req }: MyContext
  ): Promise<Book[]> {
    const books = Book.find({
      where: { status: status, userId: req.session.userId },
      relations: {
        authors: true,
        categories: true,
      },
    });
    if (!books) {
      throw new GraphQLError("No books found", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    }
    return books;
  }

  @Mutation(() => Book)
  @UseMiddleware(authenticate)
  async createBook(
    @Arg("input") input: BookInput,
    @Ctx() { req }: MyContext
  ): Promise<Book> {
    return Book.create({
      ...input,
      userId: req.session.userId,
    }).save();
  }

  @Mutation(() => Book, { nullable: true })
  @UseMiddleware(authenticate)
  async updateBook(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number,
    @Arg("input") input: BookInput
  ): Promise<Book | null> {
    const book = await ds
      .getRepository(Book)
      .createQueryBuilder()
      .update(Book)
      .set({ ...input })
      .where('id = :id and "userId" = :userId', {
        id,
        userId: req.session.userId,
      })
      .returning("*")
      .execute();

    return book.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticate)
  async deleteBook(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const deleted = await Book.delete({
      id,
      userId: req.session.userId,
    });
    if (!deleted) {
      return false;
    }
    return true;
  }
}
