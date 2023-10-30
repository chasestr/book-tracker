import { Box } from "@chakra-ui/react";
import React from "react";

interface PageWrapperProps {
  readonly children?: React.ReactNode;
  readonly variant?: "small" | "regular";
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};
