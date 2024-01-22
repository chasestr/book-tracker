import { ObjectType, Field, Int } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@ObjectType()
@Entity({ name: "categories" })
export class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => [Book])
  @ManyToMany(() => Book, (book) => book.categories)
  books: Book[];
}
