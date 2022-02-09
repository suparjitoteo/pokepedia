import {
  Box,
  Flex,
  Link as ChakraLink,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Loading from "@component/loading";
import { PokemonCard } from "@component/pokemon/pokemon-card";
import { SearchInput } from "@component/search-input";
import { Title } from "@component/title";
import { useGetPokemonList } from "@hooks/use-pokemon";
import { getPokemonList } from "@utils/api";
import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "react-query";

const PokemonList = () => {
  return (
    <>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <header>
        <Title>POKEPEDIA</Title>
        <SearchInput mt={4} />
      </header>
      <Box as={"main"} mt={8}>
        <Flex alignItems="baseline">
          <Text fontSize="2xl" fontWeight="bold">
            My Pokemon
          </Text>
          <ChakraLink as="p" color="blue" ml="auto">
            <Link href="/my-pokemon">See All</Link>
          </ChakraLink>
        </Flex>
        <MyPokemonGrid />
        <Box minH={8} />
        <PokemonGrid />
      </Box>
    </>
  );
};

const MyPokemonGrid = () => {
  const [pokemonList] = useGetPokemonList({ limit: 4 });

  return (
    <Flex
      overflow={["auto", "revert"]}
      flexWrap={["revert", "wrap"]}
      gridGap={4}
      m={-4}
      p={4}
      mt={0}
      minH="110px"
    >
      {pokemonList.map((pokemon) => (
        <Box
          minW={["300px", "0px"]}
          w={["300px", "calc(50% - var(--chakra-space-2))"]}
          key={pokemon.nickname}
        >
          <PokemonCard pokemon={pokemon} />
        </Box>
      ))}
    </Flex>
  );
};

const PokemonGrid = () => {
  const { isLoading, data, error } = useQuery(["pokemon-list"], () =>
    getPokemonList({})
  );

  if (isLoading) {
    return <Loading mt={4} />;
  }

  if (error) {
    return <p>There is an error !</p>;
  }

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold">
        All Pokemon
      </Text>
      <SimpleGrid columns={[1, 2, 3]} gap={4} mt={4} borderRadius="base">
        {data?.results.map((pokemon) => (
          <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`} passHref>
            <Box
              boxShadow="base"
              backgroundColor="white"
              px={4}
              py={2}
              transition="background-color 0.2s ease-out"
              _hover={{ bg: "gray.100" }}
              _active={{ bg: "gray.200" }}
              borderRadius="lg"
            >
              <Text fontSize="lg">{_.startCase(pokemon.name)}</Text>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default PokemonList;
