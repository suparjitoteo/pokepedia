import { Button, useDisclosure } from "@chakra-ui/react";
import PokemonCatchModal from "@component/pokemon/pokemon-catch-modal";
import Head from "next/head";
import { PokemonDetailView } from "@component/pokemon/pokemon-detail-view";
import { PokemonDetailNotFound } from "@component/pokemon/pokemon-detail-404";
import { BASE_URL } from "@utils/api/fetcher";
import { INamedResponse, IPokemon } from "@type/pokemon-type";
import { GetStaticPropsContext } from "next";
import { fetcher } from "@utils/api/fetcher";

const PokemonDetail = ({ data, error }: { data: IPokemon; error: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!data || error) {
    return <PokemonDetailNotFound />;
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
