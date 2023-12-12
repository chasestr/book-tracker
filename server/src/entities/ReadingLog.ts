import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";
import { GraphQLDate } from "graphql-scalars";

@ObjectType()
@Entity({ name: "reading_log" })
export class ReadingLog extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => GraphQLDate)
  @Column()
  date: Date;

  @Field(() => Int)
  @Column()
  bookId: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.logs)
  @JoinColumn({ name: "bookId" })
  book: Book;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn({ name: "userId" })
  user: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pagesRead: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  minutes: number;
}
