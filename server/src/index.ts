import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, registerEnumType } from "type-graphql";
import { BookResolver } from "./resolvers/book";
import { UserResolver } from "./resolvers/user";
import RedisStore from "connect-redis";
import session from "express-session";
import { Redis } from "ioredis";
import { getEnv } from "./config";
import "reflect-metadata";
import { createUserLoader } from "./dataloaders/User";
import { DataSource } from "typeorm";
import { ReadingLogResolver } from "./resolvers/log";
import { BookStatus } from "./entities/Book";

export const ds = new DataSource({
  type: "postgres",
  url: getEnv("DATABASE_URL"),
  logging: !__prod__,
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
});

const main = async () => {
  await ds.initialize();
  const app = express();
  await ds.runMigrations();

  const redisClient = new Redis(getEnv("REDIS_URL"));
  redisClient.connect().catch(console.error);

  const redisStore = new (RedisStore as any)({
    client: redisClient,
    disableTouch: true,
  });

  app.set("trust proxy", 1);
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
        domain: __prod__ ? ".story-stash.com" : undefined,
      },
    })
  );

  registerEnumType(BookStatus, {
    name: "BookStatus",
    description: "Available statuses for books",
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver, UserResolver, ReadingLogResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redisClient,
      userLoader: createUserLoader(),
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: getEnv("CORS_ORIGIN").split(", "),
      credentials: true,
    },
  });

  app.listen(parseInt(getEnv("PORT")), () => {
    console.log(`server started on ${getEnv("PORT")}`);
  });
};

main().catch((err) => {
  console.log(err);
});
