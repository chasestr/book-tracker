import { useBooksQuery } from "../generated/graphql";
import { PageWrapper } from "../components/PageWrapper";
import { BookCard } from "../components/book-card/card";
import { Box, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import StandardButton from "../components/base/StandardButton";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import GetStarted from "../components/home/GetStarted";
import { NextPage } from "next";
import styles from "../variables.module.scss";
import { ErrorComponent } from "../components/base/Error";
import LoadingSpinner from "../components/base/LoadingSpinner";

const Index: NextPage = () => {
  const { data, loading, fetchMore, variables, error } = useBooksQuery({
    variables: {
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error?.message.includes("Not authenticated")) {
    return (
      <PageWrapper>
        <Hero />
        <Features />
        <Testimonials />
        <GetStarted />
      </PageWrapper>
    );
  }

  if (!loading && !data) {
    return (
      <PageWrapper>
        <ErrorComponent message="We were unable to fetch your data." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Flex
        mb={4}
        bg="chakra-subtle-bg._light"
        p={4}
        justifyContent={"space-between"}
      >
        <Heading color={styles.blue}>My Books</Heading>
        <NextLink href="/create-book">
          <StandardButton ml="auto">New Book</StandardButton>
        </NextLink>
      </Flex>
      {loading && !data ? (
        <LoadingSpinner />
      ) : (
        <Box display={"flex"} flexWrap={"wrap"} p={4}>
          {data?.books.books.map((b) =>
            !b ? null : <BookCard book={b} key={b.id}></BookCard>
          )}
        </Box>
      )}
      {data && data.books.hasMore ? (
        <Flex>
          <StandardButton
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor: data.books.books[data.books.books.length - 1].title,
                },
              });
            }}
            m="auto"
            my={4}
            isLoading={loading}
          >
            Load More
          </StandardButton>
        </Flex>
      ) : null}
    </PageWrapper>
  );
};

export default Index;
