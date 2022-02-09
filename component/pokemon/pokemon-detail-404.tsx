import { Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export const PokemonDetailNotFound = () => {
  return (
    <Flex
      height="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src="/images/pokeball-background.png"
        alt="No pokemon placeholder"
        width={200}
        height={200}
        layout="fixed"
      />
      <Text mt={4} fontSize="2xl" fontWeight="semibold">
        {"Pokemon not found !"}
      </Text>
      <ChakraLink as="p" color="blue" fontSize="lg">
        <Link href="/pokemon">Try again</Link>
      </ChakraLink>
    </Flex>
  );
};
