import { Button, ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import variables from "../../variables.module.scss";

const StandardButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        color={variables.white}
        bg={props.bg ? props.bg : variables.blue}
        _hover={{ bg: variables.light_blue }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export default StandardButton;
