import { getAllPokemon } from "@utils/db";
import { useEffect, useState } from "react";
import { IPokemon } from "../types/pokemon-type";

export const useGetPokemonList = ({ limit }: { limit?: number } = {}) => {
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);

  useEffect(() => {
    getAllPokemon({ limit }).then((data) => {
      setPokemonList(data);
    });
  }, [limit]);

  return [pokemonList, setPokemonList] as const;
};
