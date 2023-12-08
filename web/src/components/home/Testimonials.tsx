import { Box, Heading, Text } from "@chakra-ui/react";
import variables from "../../variables.module.scss";

interface Props {
  quote: string;
  author: string;
}

export const Testimonial: React.FC<Props> = (p) => {
  return (
    <Box
      p={{ base: "4", md: "8" }}
      textAlign="center"
      bg={variables.dark_mint}
      borderRadius="md"
      mb="4"
      color={variables.white}
    >
      <Text fontSize={variables.font_size_l} mb="4">
        "{p.quote}"
      </Text>
      <Text fontWeight="bold">{`- ${p.author}`}</Text>
    </Box>
  );
};

const Testimonials = () => {
  return (
    <Box p={{ base: "8", md: "16" }} bg={variables.mint} textAlign="center">
      <Heading
        fontSize={{
          base: variables.font_size_2xl,
          md: variables.font_size_3xl,
        }}
        mb="8"
        color={variables.white}
      >
        What Our Users Are Saying
      </Heading>
      <Testimonial
        quote="StoryStash made it so easy for me to organize and keep track of my reading list. I love it!"
        author="Jane Doe"
      />
      {/* Add more as necessary */}
    </Box>
  );
};

export default Testimonials;
