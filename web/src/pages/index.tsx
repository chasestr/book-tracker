import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useBooksQuery } from "../generated/graphql";
import { PageWrapper } from "../components/PageWrapper";
import { BookCard } from "../components/book-card/card";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useBooksQuery({ variables });

  if (!fetching && !data) {
    return <div>No data to show</div>;
  }
  return (
    <PageWrapper>
      <Flex
        mb={4}
        bg="chakra-subtle-bg._light"
        p={4}
        justifyContent={"space-between"}
      >
        <Heading>My Books</Heading>
        <NextLink href="/create-book">
          <Button color="teal" ml="auto">
            New Book
          </Button>
        </NextLink>
      </Flex>
      {fetching && !data ? (
        <div>Loading...</div>
      ) : (
        <Box display={"flex"} flexWrap={"wrap"} p={4}>
          {data?.books.books.map((b) =>
            !b ? null : <BookCard book={b} key={b.id}></BookCard>
          )}
        </Box>
      )}
      {data && data.books.hasMore ? (
        <Flex>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.books.books[data.books.books.length - 1].title,
              })
            }
            color="teal"
            m="auto"
            my={4}
            isLoading={fetching}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </PageWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
