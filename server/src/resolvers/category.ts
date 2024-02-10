import { CategoryInput } from "../types/CategoryInput";
import { ds } from "..";
import { Category } from "../entities/Category";
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
export class PaginatedCategory {
  @Field(() => [Category])
  categories: Category[];
  @Field()
  hasMore: boolean;
}

@Resolver(Category)
export class CategoryResolver {
  @UseMiddleware(authenticate)
  @Query(() => PaginatedCategory)
  async userCategories(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedCategory> {
    const realLimit = Math.min(100, limit);
    const qb = ds
      .getRepository(Category)
      .createQueryBuilder()
      .where('"userId" = :id', { id: req.session.userId })
      .orderBy('"name"', "ASC")
      .addOrderBy('"id"', "ASC")
      .take(realLimit + 1);
    if (cursor) {
      qb.andWhere('"name" > :cursor', { cursor });
    }

    const categories = await qb.getMany();

    return {
      categories: categories.slice(0, realLimit),
      hasMore: categories.length === realLimit + 1,
    };
  }

  @UseMiddleware(authenticate)
  @Query(() => [Category])
  async userCategoriesWithoutPagination(
    @Ctx() { req }: MyContext
  ): Promise<Category[] | null> {
    const qb = ds
      .getRepository(Category)
      .createQueryBuilder()
      .where('"userId" = :id', { id: req.session.userId });

    return await qb.getMany();
  }

  @UseMiddleware(authenticate)
  @Query(() => Category, { nullable: true })
  category(@Arg("id", () => Int) id: number): Promise<Category | null> {
    return Category.findOne({
      where: {
        id,
      },
      relations: {
        books: true,
      },
    });
  }

  @Mutation(() => Category)
  @UseMiddleware(authenticate)
  async createCategory(
    @Arg("name", () => String) name: string,
    @Ctx() { req}: MyContext
  ): Promise<Category> {
    return Category.create({
      name,
      userId: req.session.userId,
    }).save();
  }

  @Mutation(() => Category, { nullable: true })
  @UseMiddleware(authenticate)
  async updateCategory(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: CategoryInput,
    @Ctx() { req}: MyContext
  ): Promise<Category | null> {
    const category = await ds
      .getRepository(Category)
      .createQueryBuilder()
      .update(Category)
      .set({ ...input })
      .where('id = :id and "userId" = :userId', {
        id,
        userId: req.session.userId,
      })
      .returning("*")
      .execute();

    return category.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticate)
  async deleteCategory(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const deleted = await Category.delete({
      id,
      userId: req.session.userId,
    });
    if (!deleted) {
      return false;
    }
    return true;
  }
}