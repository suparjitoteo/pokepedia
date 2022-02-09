import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  keyframes,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { addPokemon, isExist } from "@utils/db";
import { IPokemon } from "@type/pokemon-type";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [status, setStatus] = useState<"catching" | "success" | "failed">(
    "catching"
  );
  const [nickname, setNickname] = useState(data.name);
  const [error, setError] = useState("");

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
      description = `Gotcha. ${data.name} was caught !`;
      break;
    case "failed":
      description = `${data.name} got away`;
      break;
    case "catching":
      description = `Catching ${data.name}...`;
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
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="300px">
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
          {status === "success" && (
            <>
              <FormControl isInvalid={!!error}>
                <Input
                  mt={4}
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setError("");
                  }}
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
            </>
          )}
          {status === "failed" && (
            <Button
              mt={4}
              colorScheme="red"
              isFullWidth
              onClick={() => setStatus("catching")}
            >
              Try again
            </Button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonCatchModal;
