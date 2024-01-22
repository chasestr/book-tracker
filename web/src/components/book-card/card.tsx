import { Box, Flex, Link, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { Book, useDeleteBookMutation } from "../../generated/graphql";
import variables from "../../variables.module.scss";
import { useState } from "react";
import Image from "next/image";

type BookCardProps = {
  book: Omit<Book, "logs" | "user" | "status">;
};

export const BookCard: React.FC<BookCardProps> = (p) => {
  const [deleteBook, {}] = useDeleteBookMutation();
  const [isHovering, setIsHovering] = useState(false);

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
      <Flex direction="row" alignItems="center" height={"10em"}>
        <Box
          position="relative"
          height="100%"
          display="flex"
          flexShrink={0}
          mr={2}
        >
          <Image
            src={p.book.imgSrc}
            alt={"Image not found"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ height: "100%", width: "auto" }}
          />
        </Box>
        <Text
          fontSize={{
            base: variables.font_size_2xl,
            sm: variables.font_size_4xl,
            md: variables.font_size_6xl,
          }}
          fontWeight="bold"
          my={2}
          isTruncated
        >
          {p.book.title} - {p.book.authors.join(", ")}
        </Text>
        {isHovering && (
          <Flex
            direction="row"
            ml="auto"
            justifyContent="space-between"
            align="center"
          >
            <Link>
              <NextLink href="/book/[id]" as={`/book/${p.book.id}`}>
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
                deleteBook({
                  variables: { id: p.book.id },
                  update: (cache) => {
                    cache.evict({ id: "Book:" + p.book.id });
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
