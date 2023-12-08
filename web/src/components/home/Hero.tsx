import { Box, Heading, Text } from "@chakra-ui/react";
import variables from "../../variables.module.scss";
import NextLink from "next/link";
import StandardButton from "../base/StandardButton";

const Hero = () => {
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
          md: variables.font_size_4xl,
          lg: variables.font_size_6xl,
        }}
        mb={4}
      >
        StoryStash - Your Personal Book Tracker
      </Heading>
      <Text fontSize={variables.font_size_l} mb={8}>
        Track and organize your favorite books with ease.
      </Text>
      <NextLink href="/register" passHref>
        <StandardButton size={{ base: "md", md: "lg" }}>
          Get Started
        </StandardButton>
      </NextLink>
    </Box>
  );
};

export default Hero;
