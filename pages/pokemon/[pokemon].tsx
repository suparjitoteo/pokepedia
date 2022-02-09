import { Button, useDisclosure } from "@chakra-ui/react";
import _ from "lodash";
import PokemonCatchModal from "@component/pokemon/pokemon-catch-modal";
import Head from "next/head";
import { PokemonDetailView } from "@component/pokemon/pokemon-detail-view";
import { PokemonDetailNotFound } from "@component/pokemon/pokemon-detail-404";
import { BASE_URL } from "@utils/api/fetcher";
import { INamedResponse, IPokemon } from "@type/pokemon-type";
import { GetStaticPropsContext } from "next";

const PokemonDetail = ({ data, error }: { data: IPokemon; error: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!data || error) {
    return <PokemonDetailNotFound />;
  }

  console.log(data);

  return (
    <>
      <Head>
        <title>{_.startCase(data.name)}</title>
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
    const res = await fetch(`${BASE_URL}pokemon/${pokemon as string}`);
    const data = await res.json();
    return {
      props: {
        data,
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
