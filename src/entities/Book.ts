import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Book {
  [OptionalProps]?: "createdAt" | "updatedAt" | "publisher";

  @PrimaryKey()
  id!: number;

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ type: "text" })
  title!: string;

  @Property({ type: "text" })
  author!: string;

  @Property({ type: "text", nullable: true })
  publisher?: string;
}
