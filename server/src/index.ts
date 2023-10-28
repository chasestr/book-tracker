import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { BookResolver } from "./resolvers/book";
import { UserResolver } from "./resolvers/user";
import RedisStore from "connect-redis";
import session from "express-session";
import { Redis } from "ioredis";
import { getEnv } from "./config";
import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  const emFork = orm.em.fork();
  const app = express();

  const redisClient = new Redis({ lazyConnect: true });
  redisClient.connect().catch(console.error);

  const redisStore = new (RedisStore as any)({
    client: redisClient,
    disableTouch: true,
  });

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

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
      resolvers: [HelloResolver, BookResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      emFork: emFork,
      req,
      res,
      redisClient,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
