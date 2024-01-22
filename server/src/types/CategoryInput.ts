import { Field, InputType } from "type-graphql";
import { Category } from "../entities/Category";

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field(() => String)
  id!: number;
}
