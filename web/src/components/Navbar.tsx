import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useCurrentUserQuery, useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import variables from "../variables.module.scss";
import StandardButton from "./base/StandardButton";
import Image from "next/image";
import LoadingSpinner from "./base/LoadingSpinner";

export const Navbar: React.FC<{}> = () => {
  const apolloClient = useApolloClient();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data, loading } = useCurrentUserQuery();

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!data?.currentUser) {
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
  }
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
            color={variables.blue}
          />
        </NextLink>
        <Flex ml="auto">
          <Center>
            <Box
              mr={2}
              color={variables.blue}
              fontSize={variables.font_size_m}
              fontWeight={"bold"}
            >
              {data.currentUser.username}
            </Box>
          </Center>
          <StandardButton
            onClick={async () => {
              await logout({});
              await apolloClient.resetStore();
            }}
            isLoading={logoutFetching}
          >
            Logout
          </StandardButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
