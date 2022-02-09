import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PokemonCard } from "@component/pokemon/pokemon-card";
import { SearchInput } from "@component/search-input";
import { Title } from "@component/title";
import { useGetPokemonList } from "@hooks/use-pokemon";
import { deletePokemons } from "@utils/db";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";

const MyPokemon = () => {
  const router = useRouter();
  const [pokemonList, setPokemonList] = useGetPokemonList();
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  console.log("My Pokemon", pokemonList);

  const onEditingMode = () => {
    setIsEditing((state) => !state);
    setSelected([]);
  };

  const onDelete = () => {
    const selectedPokemon = pokemonList
      .filter((pokemon) => selected.includes(pokemon.nickname))
      .map((pokemon) => ({ nickname: pokemon.nickname, rev: pokemon._rev }));

    deletePokemons(selectedPokemon).then((deletedData) => {
      const newPokemonList = pokemonList.filter(
        (pokemon) => !deletedData?.map((t) => t.id).includes(pokemon.nickname)
      );
      setPokemonList(newPokemonList);
      onEditingMode();
      onClose();
    });
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent maxW={["80%", "400px"]}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Pokemon
            </AlertDialogHeader>

            <AlertDialogBody>
              {"Are you sure? You can't undo this action afterwards."}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <header>
        <Button
          color="black"
          transition="color 0.5s"
          variant="link"
          onClick={() => router.back()}
          leftIcon={<Icon as={FaChevronCircleLeft} boxSize={[4, 6]} />}
        >
          <Title>My Pokemon</Title>
        </Button>
        <SearchInput mt={4} />
      </header>
      <Flex as="main" position="relative" mt={8} direction="column">
        <Flex>
          {selected.length > 0 ? (
            <Text fontWeight="semibold">{selected.length} Selected</Text>
          ) : (
            <Text fontWeight="semibold">
              You owned {pokemonList.length} pokemon(s).
            </Text>
          )}
          {isEditing ? (
            <ButtonGroup variant={"link"} ml="auto">
              <Button color="blue.500" onClick={onEditingMode}>
                Cancel
              </Button>
              <Button
                color="red.500"
                onClick={onOpen}
                disabled={selected.length === 0}
              >
                Delete
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              variant="link"
              ml="auto"
              color="blue.500"
              onClick={onEditingMode}
            >
              Edit
            </Button>
          )}
        </Flex>
        <SimpleGrid columns={[1, 2]} gap={4} mt={4}>
          {pokemonList.map((pokemon) => (
            <Flex key={pokemon.nickname} alignItems="center" gap={4}>
              {isEditing && (
                <Checkbox
                  size="lg"
                  backgroundColor="white"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: "-100%",
                    right: "-100%",
                    left: "-100%",
                    bottom: "-100%",
                  }}
                  isChecked={!!selected.find((t) => t === pokemon.nickname)}
                  onChange={(e) => {
                    setSelected((prevSelected) => {
                      if (e.target.checked) {
                        return [...prevSelected, pokemon.nickname];
                      } else {
                        return prevSelected.filter(
                          (t) => t !== pokemon.nickname
                        );
                      }
                    });
                  }}
                />
              )}
              <Box flex={1}>
                <PokemonCard pokemon={pokemon} />
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default MyPokemon;
