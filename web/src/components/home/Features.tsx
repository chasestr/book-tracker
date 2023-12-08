import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import variables from "../../variables.module.scss";
import React from "react";

interface Props {
  title: string;
  description: string;
}

export const Feature: React.FC<Props> = (p) => {
  return (
    <Box flex={1} textAlign="center" p={{ base: "4", md: "8" }}>
      <Heading
        fontSize={{ base: variables.font_size_xl, md: variables.font_size_2xl }}
        mb="4"
        color={variables.dark_mint}
      >
        {p.title}
      </Heading>
      <Text color={variables.white}>{p.description}</Text>
    </Box>
  );
};

const Features = () => {
  return (
    <Stack align="center" p={{ base: "8", md: "16" }} bg={variables.mint}>
      <Feature
        title="Organize Your Library"
        description="Effortlessly organize and manage your book collection."
      />
      <Feature
        title="Track Reading Progress"
        description="Keep track of the books you've read, currently reading, and want to read."
      />
      <Feature
        title="Discover New Books"
        description="Explore recommendations based on your reading preferences."
      />
    </Stack>
  );
};

export default Features;
