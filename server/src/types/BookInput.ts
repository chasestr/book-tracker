import { InputType, Field } from "type-graphql";
import { BookStatus } from "../entities/Book";
import { AuthorInput } from "./AuthorInput";
import { CategoryInput } from "./CategoryInput";

@InputType()
export class BookInput {
  @Field()
  title: string;
  @Field(() => [AuthorInput])
  authors: AuthorInput[];
  @Field(() => BookStatus)
  status: BookStatus;
  @Field({ nullable: true })
  publisher?: string;
  @Field({ nullable: true })
  publishDate?: string;
  @Field({ nullable: true })
  pages?: number;
  @Field({ nullable: true })
  startDate?: string;
  @Field({ nullable: true })
  finishDate?: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => [CategoryInput])
  categories?: CategoryInput[];
  @Field({ nullable: true })
  rating?: number;
  @Field()
  imgSrc?: string;
}
