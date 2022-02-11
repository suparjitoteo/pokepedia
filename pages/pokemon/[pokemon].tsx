import {
  Button,
  Center,
  Text,
  useDisclosure,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Head from "next/head";
import { PokemonDetailView } from "@component/pokemon/pokemon-detail-view";
import { BASE_URL } from "@utils/api/fetcher";
import { INamedResponse, IPokemon } from "@type/pokemon-type";
import { GetStaticPropsContext } from "next";
import { fetcher } from "@utils/api/fetcher";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const PokemonCatchModal = dynamic(
  () => import("@component/pokemon/pokemon-catch-modal"),
  {
    loading: () => (
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.48)",
          zIndex: 1400,
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    ),
  }
);

const PokemonDetail = ({ data, error }: { data: IPokemon; error: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!data || error) {
    return (
      <Center flexDirection="column" height="100%">
        <Image
          src="/images/pokemon.png"
          alt="No pokemon placeholder"
          width={200}
          height={80}
          layout="fixed"
        />
        <Text mt={4} fontSize="2xl" fontWeight="semibold">
          {"Pokemon not found !"}
        </Text>
        <ChakraLink as="p" color="blue" fontSize="lg">
          <Link href="/pokemon">Try again</Link>
        </ChakraLink>
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title style={{ textTransform: "capitalize" }}>{data.name}</title>
      </Head>
      {isOpen && (
        <PokemonCatchModal data={data} isOpen={isOpen} onClose={onClose} />
      )}
      <PokemonDetailView data={data} />
      <Button
        position="fixed"
        colorScheme="green"
        boxShadow="base"
        borderRadius="full"
        fontWeight="bold"
        onClick={onOpen}
        bottom={8}
        left={0}
        right={0}
        mx="auto"
        width="150px"
      >
        Catch
      </Button>
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`${BASE_URL}pokemon?limit=50&offset=0`);
  const pokemonList = await res.json();
  const paths = pokemonList.results.map((pokemon: INamedResponse) => ({
    params: { pokemon: pokemon.name },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const { pokemon } = context.params ?? {};
    const data = await fetcher<IPokemon>(`/pokemon/${pokemon as string}`);

    const moves = data?.moves.map((t) => ({ move: t.move })) ?? [];
    const transformedData = { ...data, moves };

    return {
      props: {
        data: transformedData,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
};

export default PokemonDetail;
