import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import variables from "../../variables.module.scss";
import StandardButton from "../base/StandardButton";
import Image from "next/image";

const VisitorNavbar: React.FC<{}> = () => {
  return (
    <Flex
      p={4}
      position={"sticky"}
      top={0}
      zIndex={"sticky"}
      bg={variables.light_mint}
    >
      <Flex flex={1} m="auto" align="center" maxW={800} px={4}>
        <NextLink href="/" passHref>
          <Image
            src={"/images/SS1.svg"}
            alt="StoryStash"
            width={50}
            height={50}
          />
        </NextLink>
        <Box ml="auto" maxW={800}>
          <NextLink href="/login" passHref>
            <StandardButton mr={2}>Login</StandardButton>
          </NextLink>
          <NextLink href="/register" passHref>
            <StandardButton>Register</StandardButton>
          </NextLink>
        </Box>
      </Flex>
    </Flex>
  );
};

export default VisitorNavbar;
