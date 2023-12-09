import { Box, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import variables from "../../variables.module.scss";
import StandardButton from "../base/StandardButton";

const GetStarted = () => {
  return (
    <Box
      textAlign="center"
      p={{ base: "8", md: "16" }}
      bg={variables.mint}
      color={variables.white}
    >
      <Heading
        fontSize={{
          base: variables.font_size_2xl,
          md: variables.font_size_3xl,
        }}
        mb="4"
      >
        Ready to Dive In?
      </Heading>
      <Text mb="8">
        Join thousands of readers who are already using StoryStash to enhance
        their reading experience.
      </Text>
      <NextLink href="/register" passHref>
        <StandardButton size={{ base: "md", md: "lg" }} mb={16}>
          Get Started
        </StandardButton>
      </NextLink>
    </Box>
  );
};

export default GetStarted;
