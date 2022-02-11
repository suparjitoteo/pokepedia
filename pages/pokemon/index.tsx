import {
  Box,
  Button,
  Center,
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
import Head from "next/head";
import Link from "next/link";
import { useInfiniteQuery } from "react-query";
import Image from "next/image";
import { getPokemonTotal } from "@utils/db";
import React, { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "@hooks/use-intersection-observer";
import { useRouter } from "next/router";

const PokemonList = () => {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState("");
  const [pokemonTotal, setPokemonTotal] = useState(0);

  useEffect(() => {
    getPokemonTotal().then((info) => setPokemonTotal(info.doc_count));
  }, []);

  return (
    <>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <header>
        <Title>POKEPEDIA</Title>
        <form
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/pokemon/${inputSearch}`);
          }}
        >
          <SearchInput
            mt={4}
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value.toLowerCase())}
          />
        </form>
      </header>
      <Box as={"main"} mt={8}>
        <Flex alignItems="baseline">
          <Text fontSize="2xl" fontWeight="bold">
            My Pokemon ({pokemonTotal})
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

  if (pokemonList.length === 0) {
    return (
      <Flex
        mt={2}
        p={4}
        px={8}
        pt={6}
        backgroundColor="whiteAlpha.800"
        borderRadius="lg"
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Image
          src="/images/pokeball-background.png"
          alt="No pokemon placeholder"
          width={60}
          height={60}
          layout="fixed"
        />
        <Text mt={2} fontWeight="semibold">
          {"You don't have any pokemon yet."}
        </Text>
        <Text fontWeight="semibold">{" Go catch some !"}</Text>
      </Flex>
    );
  }

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
  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["pokemon-paginated"],
    async ({ pageParam = 0 }) => {
      const res = await getPokemonList({ offset: pageParam, limit: 25 });
      return res;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      getPreviousPageParam: (firstPage) => {
        if (!firstPage.previous) {
          return false;
        } else {
          const strParams = firstPage.previous.split("?")[1];
          const searchParams = new URLSearchParams(strParams);
          const previousOffset = searchParams.get("offset");
          return previousOffset;
        }
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage.next) {
          return false;
        } else {
          const strParams = lastPage.next.split("?")[1];
          const searchParams = new URLSearchParams(strParams);
          const nextOffset = searchParams.get("offset");
          return nextOffset;
        }
      },
    }
  );

  const loadMoreButtonRef = useRef(null);

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  if (status === "loading") {
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
        {data?.pages.map((page) => (
          <React.Fragment key={page.next}>
            {page.results.map((pokemon) => (
              <Link
                key={pokemon.name}
                href={`/pokemon/${pokemon.name}`}
                passHref
              >
                <Box
                  as="a"
                  boxShadow="base"
                  backgroundColor="white"
                  px={4}
                  py={2}
                  transition="background-color 0.2s ease-out"
                  _hover={{ bg: "gray.100" }}
                  _active={{ bg: "gray.200" }}
                  borderRadius="lg"
                >
                  <Text fontSize="lg" textTransform="capitalize">
                    {pokemon.name}
                  </Text>
                </Box>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
      <Center>
        <Button
          ref={loadMoreButtonRef}
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
          mt={4}
        >
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
            ? "Load More"
            : "You have reached the end."}
        </Button>
      </Center>
    </>
  );
};

export default PokemonList;
