import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import UserNavbar from "./navigation/UserNavbar";
import { isLoggedIn } from "../utils/isLoggedIn";
import VisitorNavbar from "./navigation/VisitorNavbar";

interface PageWrapperProps {
  readonly children?: React.ReactNode;
  readonly variant?: "small" | "regular";
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  variant = "regular",
}) => {
  const user = isLoggedIn();
  return (
    <Flex direction="column" minHeight="100vh">
      {user ? <UserNavbar variant={variant} /> : <VisitorNavbar />}
      <Box
        mt={8}
        mx="auto"
        maxW={variant === "regular" ? "800px" : "400px"}
        w="100%"
      >
        {children}
      </Box>
    </Flex>
  );
};
