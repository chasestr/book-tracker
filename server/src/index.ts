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
import { createUserLoader } from "./dataloaders/User";

export const ds = new DataSource({
  type: "postgres",
  url: getEnv("DATABASE_URL"),
  logging: !__prod__,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [Book, User],
});

const main = async () => {
  await ds.initialize();
  const app = express();
  ds.runMigrations();

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

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver, UserResolver],
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
