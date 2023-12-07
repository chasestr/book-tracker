import { Box, Button, Center, Flex } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useCurrentUserQuery, useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

export const Navbar: React.FC<{}> = () => {
  const apolloClient = useApolloClient();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data, loading } = useCurrentUserQuery();
  if (loading) {
    //loading user login
  }
  if (!data?.currentUser) {
    return (
      <Flex p={4} position={"sticky"} top={0} bg={"darkblue"}>
        <Box ml="auto" maxW={800}>
          <NextLink href="/login" passHref>
            <Button mr={2} color="aqua">
              Login
            </Button>
          </NextLink>
          <NextLink href="/register" passHref>
            <Button color="aqua">Register</Button>
          </NextLink>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex p={4} position={"sticky"} top={0} bg={"darkblue"}>
      <Flex flex={1} m="auto" align="center" maxW={800} px={4}>
        <NextLink href="/" passHref>
          <Button color="aqua">Home</Button>
        </NextLink>
        <Flex ml="auto">
          <Center>
            <Box mr={2} color="aqua">
              {data.currentUser.username}
            </Box>
          </Center>
          <Button
            color="aqua"
            onClick={async () => {
              await logout({});
              await apolloClient.resetStore();
            }}
            isLoading={logoutFetching}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
