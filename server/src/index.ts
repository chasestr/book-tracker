import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/book";
import { UserResolver } from "./resolvers/user";
import RedisStore from "connect-redis";
import session from "express-session";
import { Redis } from "ioredis";
import { getEnv } from "./config";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { Book } from "./entities/Book";
import { User } from "./entities/User";
import path from "path";

export const ds = new DataSource({
  type: "postgres",
  database: getEnv("DBName"),
  username: getEnv("DBUser"),
  password: getEnv("DBPass"),
  logging: !__prod__,
  synchronize: true,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [Book, User],
  port: parseInt(getEnv("DBPort")),
});

const main = async () => {
  await ds.initialize();
  const app = express();
  ds.runMigrations();

  const redisClient = new Redis({ lazyConnect: true });
  redisClient.connect().catch(console.error);

  const redisStore = new (RedisStore as any)({
    client: redisClient,
    disableTouch: true,
  });

  app.use(
    session({
      name: COOKIE_NAME,
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      secret: getEnv("RedisSession"),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 265 * 10,
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redisClient,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    },
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
