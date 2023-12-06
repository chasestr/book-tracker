import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

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

  @Field()
  @Column()
  author!: string;

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
  notes?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  summary?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rating?: number;

  @Field()
  @Column()
  userId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: "userId" })
  user: User;
}
