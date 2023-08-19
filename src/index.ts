import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Book } from "./entities/Book";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  const emFork = orm.em.fork();
  // const book = emFork.create(Book, { title: "It", author: "Stephen King" });
  // await emFork.persistAndFlush(book);

  const books = await emFork.find(Book, {});
  console.log(books);
};

main().catch((err) => {
  console.log(err);
});
