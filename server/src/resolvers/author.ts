import { AuthorInput } from "../types/AuthorInput";
import { ds } from "..";
import { Author } from "../entities/Author";
import { authenticate } from "../middleware/authentication";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@ObjectType()
export class PaginatedAuthors {
  @Field(() => [Author])
  authors: Author[];
  @Field()
  hasMore: boolean;
}

@Resolver(Author)
export class AuthorResolver {
  @UseMiddleware(authenticate)
  @Query(() => PaginatedAuthors)
  async userAuthors(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedAuthors> {
    const realLimit = Math.min(100, limit);
    const qb = ds
      .getRepository(Author)
      .createQueryBuilder()
      .where('"userId" = :id', { id: req.session.userId })
      .orderBy('"name"', "ASC")
      .addOrderBy('"id"', "ASC")
      .take(realLimit + 1);
    if (cursor) {
      qb.andWhere('"name" > :cursor', { cursor });
    }

    const authors = await qb.getMany();

    return {
      authors: authors.slice(0, realLimit),
      hasMore: authors.length === realLimit + 1,
    };
  }

  @UseMiddleware(authenticate)
  @Query(() => [Author])
  async userAuthorsWithoutPagination(
    @Ctx() { req }: MyContext
  ): Promise<Author[] | null> {
    const qb = ds
      .getRepository(Author)
      .createQueryBuilder()
      .where('"userId" = :id', { id: req.session.userId });

    return await qb.getMany();
  }

  @UseMiddleware(authenticate)
  @Query(() => Author, { nullable: true })
  author(@Arg("id", () => Int) id: number): Promise<Author | null> {
    return Author.findOne({
      where: {
        id,
      },
      relations: {
        books: true,
      },
    });
  }

  @Mutation(() => Author)
  @UseMiddleware(authenticate)
  async createAuthor(
    @Arg("name", () => String) name: string,
    @Ctx() { req}: MyContext
  ): Promise<Author> {
    return Author.create({
      name,
      userId: req.session.userId,
    }).save();
  }

  @Mutation(() => Author, { nullable: true })
  @UseMiddleware(authenticate)
  async updateAuthor(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: AuthorInput,
    @Ctx() {req}: MyContext
  ): Promise<Author | null> {
    const author = await ds
      .getRepository(Author)
      .createQueryBuilder()
      .update(Author)
      .set({ ...input })
      .where('id = :id and "userId" = :userId', {
        id,
        userId: req.session.userId,
      })
      .returning("*")
      .execute();

    return author.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticate)
  async deleteAuthor(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const deleted = await Author.delete({
      id,
      userId: req.session.userId,
    });
    if (!deleted) {
      return false;
    }
    return true;
  }
}
