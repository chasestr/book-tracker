import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@ObjectType()
@Entity({ name: "authors" })
export class Author extends BaseEntity {
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
  @ManyToOne(() => User, (user) => user.authors)
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => [Book])
  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];
}
