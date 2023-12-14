import React from "react";
import Modal from "react-modal";
import { Box, Heading, Text } from "@chakra-ui/react";
import variables from "../../variables.module.scss";
import StandardButton from "../base/StandardButton";
import styles from "./DemoModal.module.scss";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Demo Modal"
      overlayClassName={{
        base: styles.Overlay,
        afterOpen: styles["Overlay--after-open"],
        beforeClose: styles["Overlay--before-close"],
      }}
      className={{
        base: styles.Modal,
        afterOpen: styles["Modal--after-open"],
        beforeClose: styles["Modal--before-close"],
      }}
    >
      <Box
        p={6}
        maxW={{ base: "100%", md: "400px" }}
        mx="auto"
        bg={variables.blue}
        color={variables.white}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Heading fontSize="xl" mb={4}>
          Hello!
        </Heading>
        <Text mb={4}>
          My name is Chase, and I'm excited to introduce you to StoryStash!
          Thanks to the unique URL you entered, you now have access to a unique
          demo account.
        </Text>
        <Text mb={4}>
          Feel free to explore the app and get a sense of its features. If you
          have any questions or feedback, I'd love to hear from you!
        </Text>
        <StandardButton bg={variables.light_blue} onClick={onClose}>
          Explore the App
        </StandardButton>
      </Box>
    </Modal>
  );
};

export default DemoModal;
