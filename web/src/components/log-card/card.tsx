import { Box, Flex, Link, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import {
  ReadingLog,
  useBookQuery,
  useDeleteLogMutation,
} from "../../generated/graphql";
import variables from "../../variables.module.scss";
import { useState } from "react";
import LoadingSpinner from "../base/LoadingSpinner";
import { ErrorComponent } from "../base/Error";

type BookCardProps = {
  log: Omit<ReadingLog, "user" | "book">;
};

export const LogCard: React.FC<BookCardProps> = (p) => {
  const [deleteLog, {}] = useDeleteLogMutation();
  const [isHovering, setIsHovering] = useState(false);
  const { data, loading, error } = useBookQuery({
    variables: { id: p.log.bookId },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data?.book?.title) {
    return (
      <ErrorComponent
        message={`We were unable to load this log's associated
        book. Please try again.`}
      />
    );
  }

  return (
    <Box
      p={4}
      border={1}
      borderColor={variables.light_mint}
      borderRadius="md"
      boxShadow="md"
      bg={variables.light_mint}
      color={variables.blue}
      width="100%"
      maxW="800px"
      mb={4}
      transition="transform 0.1s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Flex direction="row" alignItems="center">
        <Text
          fontSize={variables.font_size_xl}
          fontWeight="bold"
          my={2}
          isTruncated
        >
          {p.log.date.split("T")[0]} | {data.book.title}{" "}
          {p.log.pagesRead ? `| ${p.log.pagesRead}pgs` : null}{" "}
          {p.log.minutes ? `| ${Math.floor(p.log.minutes / 60)}hrs ${p.log.minutes % 60}mins` : null}
        </Text>
        {isHovering && (
          <Flex
            direction="row"
            ml="auto"
            justifyContent="space-between"
            align="center"
          >
            <Link>
              <NextLink href="/log/[id]" as={`/log/${p.log.id}`}>
                <Button
                  bg={variables.dark_mint}
                  color={variables.white}
                  size="md"
                  _hover={{ bg: variables.extra_dark_mint }}
                >
                  View/Edit
                </Button>
              </NextLink>
            </Link>
            <Button
              size="md"
              ml={2}
              bg={variables.red}
              color={variables.white}
              onClick={() => {
                deleteLog({
                  variables: { id: p.log.id },
                  update: (cache) => {
                    cache.evict({ id: "ReadingLog:" + p.log.id });
                  },
                });
              }}
              _hover={{ bg: variables.dark_red }}
            >
              Delete
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
