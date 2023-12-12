import assert from "assert";
import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createWithApollo } from "../utils/createWithApollo";
import { PaginatedBooks, PaginatedLogs } from "../generated/graphql";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { useEffect } from "react";

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
              userLogs: {
                keyArgs: [],
                merge(
                  existing: PaginatedLogs | undefined,
                  incoming: PaginatedLogs
                ): PaginatedLogs {
                  return {
                    ...incoming,
                    logs: [...(existing?.logs || []), ...incoming.logs],
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

  // This is really bad practice, but I'm adding it because react-ssr-prepass is
  // missing a function declaration introduced in react 18 and spams the same
  // console error. Issues have already been filed, and I'll keep watch for a fix
  // or switch to another library.
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (!args[0].includes("Error from getDataFromTree")) {
        originalError.apply(console, args);
      }
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <>
      <ChakraProvider theme={theme}>
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
