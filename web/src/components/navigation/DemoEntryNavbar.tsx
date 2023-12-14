import { Flex } from "@chakra-ui/react";
import React from "react";
import variables from "../../variables.module.scss";
import Image from "next/image";

const DemoNavbar: React.FC<{}> = () => {
  return (
    <Flex
      p={4}
      position={"sticky"}
      top={0}
      zIndex={"sticky"}
      bg={variables.light_mint}
    >
      <Flex flex={1} m="auto" align="center" maxW={800} px={4}>
        <Image
          src={"/images/SS1.svg"}
          alt="StoryStash"
          width={50}
          height={50}
        />
      </Flex>
    </Flex>
  );
};

export default DemoNavbar;
