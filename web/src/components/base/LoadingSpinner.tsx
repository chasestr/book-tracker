import { Center, Spinner } from "@chakra-ui/react";
import variables from "../../variables.module.scss";

const LoadingSpinner = () => {
  return (
    <Center>
      <Spinner size="xl" color={variables.blue} />
    </Center>
  );
};

export default LoadingSpinner;
