import { Exchange, fetchExchange, stringifyVariables } from "urql";
import { Resolver, cacheExchange } from "@urql/exchange-graphcache";
import {
  LogoutMutation,
  CurrentUserQuery,
  CurrentUserDocument,
  LoginMutation,
  RegisterMutation,
} from "../generated/graphql";
import { updateQuery } from "./updateQuery";
import { pipe, tap } from "wonka";
import Router from "next/router";
import { isServer } from "./isServer";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (
          error?.message?.includes("Not authenticated") &&
          typeof window !== "undefined"
        ) {
          console.log("hit" + error.message);
          Router.replace("/login");
        }
      })
    );
  };

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const inCache = cache.resolve(entityKey, fieldKey);
    let hasMore = true;
    info.partial = !inCache;
    let results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "books") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }

      results.push(...data);
    });

    return {
      books: results,
      hasMore,
      __typename: "PaginatedBooks",
    };
  };
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx.req.headers.cookie;
  }
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      cacheExchange({
        keys: {
          PaginatedBooks: () => null,
        },
        resolvers: {
          Query: {
            books: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            createBook: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "books"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", "books", fi.arguments);
              });
            },
            logout: (_result, _args, cache, _info) => {
              updateQuery<LogoutMutation, CurrentUserQuery>(
                cache,
                { query: CurrentUserDocument },
                _result,
                () => ({ currentUser: null })
              );
            },
            login: (_result, _args, cache, _info) => {
              updateQuery<LoginMutation, CurrentUserQuery>(
                cache,
                { query: CurrentUserDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      currentUser: result.login.user,
                    };
                  }
                }
              );
            },
            register: (_result, _args, cache, _info) => {
              updateQuery<RegisterMutation, CurrentUserQuery>(
                cache,
                { query: CurrentUserDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      currentUser: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      ssrExchange,
      errorExchange,
      fetchExchange,
    ],
  };
};
