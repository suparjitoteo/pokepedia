import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  keyframes,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Text,
} from "@chakra-ui/react";
import { addPokemon, isExist } from "@utils/db";
import { IPokemon } from "@type/pokemon-type";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const onCatchPokemon = () => {
  return Math.random() < 0.5;
};

const jump = keyframes`
  0% {
    transform: translateY(0%);
  }
  30% {
    transform: translateY(-50%) rotate(-280deg);
  }
  50% {
    transform: translateY(0%);
  }
`;

const PokemonCatchModal = ({
  data,
  isOpen,
  onClose,
}: {
  data: IPokemon;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [status, setStatus] = useState<
    "catching" | "success" | "failed" | "catched"
  >("catching");
  const [nickname, setNickname] = useState(data.name);
  const [error, setError] = useState("");

  const fadeIn = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
    show: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    if (status !== "catching") {
      return;
    }

    const timeout = setTimeout(() => {
      const isSuccess = onCatchPokemon();
      setStatus(isSuccess ? "success" : "failed");
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [status]);

  let description;
  switch (status) {
    case "success":
      description = `Gotcha. ${data.name} was caught.`;
      break;
    case "failed":
      description = `${data.name} got away.`;
      break;
    case "catching":
      description = `Catching ${data.name}...`;
      break;
    case "catched":
      description = `${data.name} added to collection.`;
      break;
    default:
      throw new Error("Invalid Status");
  }

  const onAddToCollection = async () => {
    const exist = await isExist(nickname);
    if (exist) {
      setError("Name already exists. Please input a different nickname.");
      return;
    }

    const pokemon = { ...data, nickname };
    addPokemon(pokemon).then(() => {
      setStatus("catched");
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      {/*
        Actually ChakraUI has modaloverlay component.
        But since this modal is dynamically imported in [pokemon].ts
        I want to remove the opacity animation to prevent a slight second of flash.
      */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100%",
          backgroundColor: "var(--chakra-colors-blackAlpha-600)",
          zIndex: "var(--chakra-zIndices-modal)",
        }}
      />
      <ModalContent maxW="300px">
        <ModalCloseButton />
        <ModalBody
          pt={8}
          pb={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            animation={`${
              status === "catching" ? `${jump} 1500ms infinite 1s` : undefined
            }`}
            willChange="transform"
          >
            <Image
              src="/images/pokeball.png"
              width={60}
              height={60}
              alt="pokeball"
            />
          </Box>
          <Text mt={2}>{description}</Text>
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="show"
                style={{ width: "100%" }}
              >
                <FormControl isInvalid={!!error}>
                  <Input
                    mt={4}
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      setError("");
                    }}
                    autoFocus
                  />
                  {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
                </FormControl>
                <Button
                  mt={4}
                  colorScheme="green"
                  onClick={onAddToCollection}
                  isFullWidth
                >
                  Add to collection
                </Button>
              </motion.div>
            )}
            {status === "failed" && (
              <Button
                as={motion.button}
                variants={fadeIn}
                initial="hidden"
                animate="show"
                exit="exit"
                mt={4}
                colorScheme="red"
                isFullWidth
                onClick={() => setStatus("catching")}
              >
                Try again
              </Button>
            )}
            {status === "catched" && (
              <Button
                as={motion.button}
                variants={fadeIn}
                initial="hidden"
                animate="show"
                mt={4}
                colorScheme="green"
                isFullWidth
                onClick={() => router.push("/my-pokemon")}
              >
                Go to collection
              </Button>
            )}
          </AnimatePresence>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonCatchModal;
