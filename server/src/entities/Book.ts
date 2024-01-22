import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { ReadingLog } from "./ReadingLog";
import { Author } from "./Author";
import { Category } from "./Category";
import { imageBackup } from "../constants";

export enum BookStatus {
  NOT_STARTED = "Not_Started",
  IN_PROGRESS = "In_Progress",
  FINISHED = "Finished",
}

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  title!: string;

  @Field({ defaultValue: imageBackup })
  @Column({ default: imageBackup })
  imgSrc?: string;

  @Field(() => BookStatus)
  @Column({
    type: "enum",
    enum: BookStatus,
    default: BookStatus.NOT_STARTED,
  })
  status!: BookStatus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  publisher?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pages?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  finishDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  publishDate?: Date;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "float" })
  rating?: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => [ReadingLog])
  @OneToMany(() => ReadingLog, (log) => log.book, {
    cascade: true,
  })
  logs: ReadingLog[];

  @Field(() => [Category])
  @ManyToMany(() => Category, {
    cascade: true,
  })
  @JoinTable({ name: "book_categories" })
  categories: Category[];

  @Field(() => [Author])
  @ManyToMany(() => Author, {
    cascade: true,
  })
  @JoinTable({ name: "book_authors " })
  authors: Author[];
}
