import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";

export type MyContext = {
  emFork: EntityManager<IDatabaseDriver<Connection>>;
};
