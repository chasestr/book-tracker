import { ds } from "src";
import { Category } from "src/entities/Category";
import { authenticate } from "src/middleware/authentication";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@InputType()
export class CategoryInput {
  @Field()
  name: string;
}

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
    @Arg("input") input: CategoryInput
  ): Promise<Category> {
    return Category.create({
      ...input,
    }).save();
  }

  @Mutation(() => Category, { nullable: true })
  @UseMiddleware(authenticate)
  async updateCategory(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: CategoryInput
  ): Promise<Category | null> {
    const category = await ds
      .getRepository(Category)
      .createQueryBuilder()
      .update(Category)
      .set({ ...input })
      .where('id = :id', {
        id,
      })
      .returning("*")
      .execute();

    return category.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticate)
  async deleteCategory(
    @Arg("id", () => Int) id: number,
  ): Promise<boolean> {
    const deleted = await Category.delete({
      id,
    });
    if (!deleted) {
      return false;
    }
    return true;
  }
}