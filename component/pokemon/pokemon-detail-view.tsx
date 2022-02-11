import {
  Box,
  Flex,
  Button,
  Icon,
  Tag,
  StatGroup,
  Stat,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Progress,
  Text,
} from "@chakra-ui/react";
import { Title } from "@component/title";
import { useGetBackgroundColor } from "@hooks/use-get-background-color";
import { IPokemon } from "@type/pokemon-type";
import { generateColor } from "@utils/common";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";

export const PokemonDetailView = ({ data }: { data: IPokemon }) => {
  const pokemonImageUrl = data?.sprites.other["official-artwork"].front_default;

  const [imgSrc, setImgSrc] = useState<string>("");
  const backgroundColor = useGetBackgroundColor({
    imgSrc,
  });

  const headerTextColor = generateColor(backgroundColor);

  return (
    <>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="290px"
        backgroundColor={backgroundColor}
        transition="background-color 0.5s"
      />
      <Flex
        as="header"
        alignItems="baseline"
        gap={4}
        position="relative"
        color={headerTextColor}
        transition="color 0.5s"
      >
        <Button
          color={headerTextColor}
          transition="color 0.5s"
          variant="link"
          onClick={() => router.back()}
          leftIcon={<Icon as={FaChevronCircleLeft} boxSize={[4, 6]} />}
        >
          <Title>{data.name}</Title>
        </Button>
        <Text
          ml="auto"
          fontWeight="bold"
          color={headerTextColor}
          fontSize={["md", "lg"]}
        >
          #{data.order.toString().padStart(3, "0")}
        </Text>
      </Flex>
      <Flex as="main" position="relative" mt={4} direction="column">
        <Box margin="auto" borderRadius="base">
          <Image
            src={pokemonImageUrl}
            alt={data.name}
            width={250}
            height={250}
            placeholder="blur"
            blurDataURL={data.sprites.front_default}
            onLoad={(e) => {
              setImgSrc(e.currentTarget.src);
            }}
          />
        </Box>
        <Flex justifyContent="center" p={2} gap={2}>
          {data.types.map((type) => (
            <Tag size={"md"} key={type.type.name} colorScheme="green">
              {type.type.name}
            </Tag>
          ))}
        </Flex>
        <StatGroup textAlign="center" w={["100%", "400px"]} margin="auto">
          <Stat>
            <StatNumber>{data.base_experience}</StatNumber>
            <StatHelpText>Base Exp</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber>{data.height * 10} cm</StatNumber>
            <StatHelpText>Height</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber>{data.weight / 10} kg</StatNumber>
            <StatHelpText>Weight</StatHelpText>
          </Stat>
        </StatGroup>
        <SimpleGrid columns={[1, 2]} mt={4} gap={4}>
          <Box boxShadow="base" backgroundColor="white" p={4} borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold">
              Stats
            </Text>
            <Box mt={4}>
              {data.stats.map((stat) => {
                return (
                  <Flex key={stat.stat.name} gap={2}>
                    <Text flex={1}>{stat.stat.name}</Text>
                    <Flex flex={1} gap={2} alignItems="center">
                      <Progress w="100%" value={stat.base_stat} />
                      <Text>{stat.base_stat}</Text>
                    </Flex>
                  </Flex>
                );
              })}
            </Box>
          </Box>
          <Box boxShadow="base" backgroundColor="white" p={4} borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold">
              Abilities
            </Text>
            <Box mt={4}>
              {data.abilities.map((ability) => {
                return (
                  <Flex key={ability.ability.name} gap={2}>
                    <Text flex={1}>Slot {ability.slot}</Text>
                    <Text flex={2}>{ability.ability.name}</Text>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        </SimpleGrid>
        <Box
          boxShadow="base"
          backgroundColor="white"
          p={4}
          borderRadius="lg"
          mt={4}
        >
          <Text fontSize="lg" fontWeight="bold">
            Moves
          </Text>
          <Flex mt={4} gap={2} flexWrap="wrap">
            {data.moves.map((move) => (
              <Tag size={"md"} key={move.move.name}>
                {move.move.name}
              </Tag>
            ))}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
