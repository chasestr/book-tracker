import assert from "assert";
import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createWithApollo } from "../utils/createWithApollo";
import { PaginatedBooks } from "../generated/graphql";
import { ChakraProvider } from "@chakra-ui/react";

const withApollo = createWithApollo({
  client({ headers }) {
    const isServer = typeof window === "undefined";
    if (isServer) {
      assert.ok(headers!.host, "`headers` should be available server-side");
    } else {
      assert.ok(!headers, "`headers` should not be available client-side");
    }

    return new ApolloClient({
      uri: process.env.NEXT_PUBLIC_BACKEND_URL as string,
      credentials: "include",
      headers: {
        cookie: (isServer ? headers?.cookie : undefined) || "",
      },
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              books: {
                keyArgs: [],
                merge(
                  existing: PaginatedBooks | undefined,
                  incoming: PaginatedBooks
                ): PaginatedBooks {
                  return {
                    ...incoming,
                    books: [...(existing?.books || []), ...incoming.books],
                  };
                },
              },
            },
          },
        },
      }),
    });
  },
});

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  // @ts-ignore can't properly type this function, see https://github.com/vercel/next.js/issues/42846
  const { extraAppProp } = props;
  return (
    <>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const props = await App.getInitialProps(ctx);
  return {
    ...props,
    extraAppProp: true,
  };
};

export default withApollo(MyApp);
