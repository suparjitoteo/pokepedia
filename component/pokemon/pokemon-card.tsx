import { Box, Text } from "@chakra-ui/react";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useGetBackgroundColor } from "../../hooks/use-get-background-color";
import { IPokemon } from "../../types/pokemon-type";
import { generateColor } from "../../utils/common";

export const PokemonCard = ({ pokemon }: { pokemon: IPokemon }) => {
  const pokemonImageUrl =
    pokemon.sprites.other["official-artwork"].front_default;
  const backgroundColor = useGetBackgroundColor({
    imageUrl: pokemonImageUrl,
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
      >
        <Box position="absolute" top={-3} right={2}>
          <Image
            src={pokemonImageUrl}
            width={130}
            height={130}
            alt={pokemon.name}
            placeholder="blur"
            blurDataURL={pokemon.sprites.front_default}
          />
        </Box>
        <Box position="relative">
          <Text fontSize="lg" fontWeight="semibold">
            #{_.padStart(pokemon.order.toString(), 3, "0")}{" "}
            {_.startCase(pokemon.name)}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {_.startCase(pokemon.nickname)}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};
