import path from "path";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/postgresql";
import { getEnv } from "./config";

export default {
  dbName: getEnv("DBName"),
  debug: !__prod__,
  type: "postgresql",
  user: getEnv("DBUser"),
  password: getEnv("DBPass"),
  entities: [path.join(__dirname, "./entities")],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
  port: parseInt(getEnv("DBPort")),
} as Parameters<typeof MikroORM.init>[0];
