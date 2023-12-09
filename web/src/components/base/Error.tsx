import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import variables from "../../variables.module.scss";
import NextLink from "next/link";

interface Props {
  message: string;
}

export const ErrorComponent: React.FC<Props> = (p) => {
  return (
    <Box
      textAlign={"center"}
      p={{ base: "8", md: "16" }}
      bg={variables.mint}
      color={variables.white}
    >
      <Heading
        fontSize={{
          base: variables.font_size_2xl,
          md: variables.font_size_3xl,
        }}
        mb={4}
      >
        Oops! Something went wrong :c
      </Heading>
      <Text fontSize={variables.font_size_l} mb={8}>
        {p.message}
      </Text>
      <Link>
        <NextLink href="/" passHref>
          <Button
            bg={variables.red}
            color={variables.white}
            size={{ base: "md", md: "lg" }}
            _hover={{ bg: variables.dark_red }}
          >
            Back to home
          </Button>
        </NextLink>
      </Link>
    </Box>
  );
};
