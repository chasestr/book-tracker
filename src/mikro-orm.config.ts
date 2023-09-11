import path from "path";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/postgresql";
import { configDotenv } from "dotenv";
configDotenv();

export default {
  dbName: process.env.DBName,
  debug: !__prod__,
  type: "postgresql",
  user: process.env.DBUser,
  password: process.env.DBPass,
  entities: [path.join(__dirname, "./entities")],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
  port: process.env.DBPort,
} as Parameters<typeof MikroORM.init>[0];
