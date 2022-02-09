import { Button, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "react-query";
import _ from "lodash";
import { useRouter } from "next/router";
import { getPokemonByName } from "@utils/api";
import PokemonCatchModal from "@component/pokemon/pokemon-catch-modal";
import Head from "next/head";
import { PokemonDetailFallback } from "@component/pokemon/pokemon-detail-fallback";
import { PokemonDetailView } from "@component/pokemon/pokemon-detail-view";

const PokemonDetail = () => {
  const router = useRouter();
  const { pokemon } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data } = useQuery(
    ["pokemon", pokemon],
    () => getPokemonByName({ name: pokemon as string }),
    {
      enabled: !!pokemon,
    }
  );

  if (isLoading) {
    return <PokemonDetailFallback />;
  }

  if (!data) {
    return <p>Pokemon not found !</p>;
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
        size="sm"
        colorScheme="green"
        boxShadow="base"
        borderRadius="full"
        fontWeight="bold"
        onClick={onOpen}
        bottom={6}
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

export default PokemonDetail;
