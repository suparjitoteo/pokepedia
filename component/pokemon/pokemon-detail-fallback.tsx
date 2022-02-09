import { IPokemon } from "@type/pokemon-type";
import { PokemonDetailView } from "./pokemon-detail-view";

export const PokemonDetailFallback = () => {
  const dummyPokemon: IPokemon = {
    abilities: [
      {
        slot: 1,
        is_hidden: false,
        ability: {
          name: "XXXXX",
          url: "",
        },
      },
    ],
    base_experience: 999,
    height: 0,
    id: 0,
    moves: [],
    name: "XXXXX",
    order: 999,
    species: { name: "", url: "" },
    stats: [
      {
        base_stat: 0,
        effort: 0,
        stat: {
          name: "hp",
          url: "",
        },
      },
      {
        base_stat: 0,
        effort: 0,
        stat: {
          name: "attack",
          url: "",
        },
      },
      {
        base_stat: 0,
        effort: 0,
        stat: {
          name: "defense",
          url: "",
        },
      },
      {
        base_stat: 0,
        effort: 0,
        stat: {
          name: "special-attack",
          url: "",
        },
      },
      {
        base_stat: 0,
        effort: 0,
        stat: {
          name: "special-defence",
          url: "",
        },
      },
      {
        base_stat: 0,
        effort: 0,
        stat: {
          name: "speed",
          url: "",
        },
      },
    ],
    types: [
      {
        slot: 1,
        type: {
          name: "XXX",
          url: "",
        },
      },
    ],
    weight: 0,
    sprites: {
      front_default: "/images/fallback.jpg",
      other: {
        "official-artwork": {
          front_default: "/images/fallback.jpg",
        },
      },
    },
    nickname: "",
    _rev: "",
  };

  return <PokemonDetailView data={dummyPokemon} />;
};
