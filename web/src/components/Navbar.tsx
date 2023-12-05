import { Box, Button, Center, Flex } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useCurrentUserQuery, useLogoutMutation } from "../generated/graphql";

export const Navbar: React.FC<{}> = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useCurrentUserQuery();
  if (fetching) {
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
            onClick={() => {
              logout({});
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
