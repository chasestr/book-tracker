import { Book } from "../entities/Book";
import { Resolver, Query, Arg, Mutation } from "type-graphql";

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return Book.find();
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
  async createBook(
    @Arg("title") title: string,
    @Arg("author") author: string
  ): Promise<Book> {
    const book = Book.create({ title, author }).save();
    return book;
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
