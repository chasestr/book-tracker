import { Book } from "../entities/Book";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Field,
  Ctx,
  InputType,
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

@InputType()
export class BookInput {
  @Field()
  title: string;
  @Field()
  author: string;
  @Field({ nullable: true })
  publisher?: string;
  @Field({ nullable: true })
  pages?: number;
  @Field({ nullable: true })
  startDate?: Date;
  @Field({ nullable: true })
  finishDate?: Date;
  @Field({ nullable: true })
  notes?: string;
  @Field({ nullable: true })
  summary?: string;
  @Field({ nullable: true })
  genre?: string;
  @Field({ nullable: true })
  rating?: number;
}

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

  @Query(() => Book, { nullable: true })
  book(@Arg("id", () => Int) id: number): Promise<Book | null> {
    return Book.findOne({
      where: {
        id,
      },
    });
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

  //determine how to update an entire record based
  //on whatever fields the user has modified
  //Maybe just use a state on the book page for editing/not editing?
  @Mutation(() => Book, { nullable: true })
  @UseMiddleware(authenticate)
  async updateBook(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number,
    @Arg("title", { nullable: true }) title: string
  ): Promise<Book | null> {
    const book = await ds
      .getRepository(Book)
      .createQueryBuilder()
      .update(Book)
      .set({ title }) //figure out how to set all available/modified
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
