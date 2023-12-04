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
} from "type-graphql";
import { MyContext } from "../types";
import { authenticate } from "../middleware/authentication";
import { ds } from "..";

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

@Resolver()
export class BookResolver {
  // @UseMiddleware(authenticate)
  @Query(() => PaginatedBooks)
  async books(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedBooks> {
    const realLimit = Math.min(100, limit);
    const qb = ds
      .getRepository(Book)
      .createQueryBuilder("p")
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
  book(@Arg("bookId") id: number): Promise<Book | null> {
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

  @Mutation(() => Book, { nullable: true })
  async updateBookTitle(
    @Arg("id") id: number,
    @Arg("title") title: string
  ): Promise<Book | null> {
    const book = await Book.findOne({ where: { id } });
    if (!book) {
      return null;
    }
    if (typeof title !== "undefined") {
      book.title = title;
      Book.update({ id }, { title });
    }
    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("id") id: number): Promise<boolean> {
    const deleted = await Book.delete({ id });
    if (!deleted) {
      return false;
    }
    return true;
  }
}
