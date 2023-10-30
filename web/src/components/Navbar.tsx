import { Box, Button, Center, Flex } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useCurrentUserQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export const Navbar: React.FC<{}> = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useCurrentUserQuery({
    pause: isServer(),
  });
  if (fetching) {
    //loading user login
  }
  if (!data?.currentUser) {
    return (
      <Flex bg="chakra-subtle-bg._light" p={4}>
        <Box ml="auto">
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
    <Flex bg="chakra-subtle-bg._light" p={4}>
      <Flex ml="auto">
        <Center>
          <Box mr={2} color="aqua">
            {data.currentUser.username}
          </Box>
        </Center>
        <Button
          color="aqua"
          onClick={() => {
            logout({});
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};
