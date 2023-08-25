import { Book } from "../entities/Book";
import { MyContext } from "../types";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";

@Resolver()
export class BookResolver {
  //resolve all books
  @Query(() => [Book])
  books(@Ctx() { emFork }: MyContext): Promise<Book[]> {
    return emFork.find(Book, {});
  }

  //resolve book by id
  @Query(() => Book, { nullable: true })
  book(
    @Arg("bookId") id: number,
    @Ctx() { emFork }: MyContext
  ): Promise<Book | null> {
    return emFork.findOne(Book, { id });
  }

  //create book
  @Mutation(() => Book)
  async createBook(
    @Arg("title") title: string,
    @Arg("author") author: string,
    @Ctx() { emFork }: MyContext
  ): Promise<Book> {
    const book = emFork.create(Book, { title, author });
    await emFork.persistAndFlush(book);
    return book;
  }

  //update book title
  @Mutation(() => Book, { nullable: true })
  async updateBookTitle(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Ctx() { emFork }: MyContext
  ): Promise<Book | null> {
    const book = await emFork.findOne(Book, { id });
    if (!book) {
      return null;
    }
    if (typeof title !== "undefined") {
      book.title = title;
      emFork.persistAndFlush(book);
    }
    return book;
  }

  //delete book by id
  @Mutation(() => Boolean)
  async deleteBook(
    @Arg("id") id: number,
    @Ctx() { emFork }: MyContext
  ): Promise<boolean> {
    const deleted = await emFork.nativeDelete(Book, {id});
    if (!deleted) {
      return false;
    }
    return true;
  }
}
