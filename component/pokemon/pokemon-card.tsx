import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetBackgroundColor } from "../../hooks/use-get-background-color";
import { IPokemon } from "../../types/pokemon-type";
import { generateColor } from "../../utils/common";

export const PokemonCard = ({ pokemon }: { pokemon: IPokemon }) => {
  const pokemonImageUrl =
    pokemon.sprites.other["official-artwork"].front_default;
  const [imgSrc, setImgSrc] = useState<string>("");

  const backgroundColor = useGetBackgroundColor({
    imgSrc,
  });
  const headerTextColor = generateColor(backgroundColor);

  return (
    <Link href={`/pokemon/${pokemon.name}`} passHref>
      <Box
        borderRadius="xl"
        p={4}
        backgroundColor={backgroundColor}
        color={headerTextColor}
        position="relative"
        overflow="hidden"
        transition="background-color 0.5s, color 0.5s"
        cursor="pointer"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 300ms",
        }}
        willChange="transform"
      >
        <Box position="absolute" top={-3} right={2}>
          <Image
            src={pokemonImageUrl}
            width={130}
            height={130}
            alt={pokemon.name}
            placeholder="blur"
            blurDataURL={pokemon.sprites.front_default}
            onLoad={(e) => {
              setImgSrc(e.currentTarget.src);
            }}
          />
        </Box>
        <Box position="relative" textTransform="capitalize">
          <Text fontSize="lg" fontWeight="semibold">
            #{pokemon.order.toString().padStart(3, "0")} {pokemon.name}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {pokemon.nickname}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};
