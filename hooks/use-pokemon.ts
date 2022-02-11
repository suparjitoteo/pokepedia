import { getAllPokemon } from "@utils/db";
import { useEffect, useState } from "react";
import { IPokemon } from "../types/pokemon-type";

export const useGetPokemonList = ({ limit }: { limit?: number } = {}) => {
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllPokemon({ limit }).then((data) => {
      setPokemonList(data);
      setLoading(false);
    });
  }, [limit]);

  return [pokemonList, setPokemonList, loading] as const;
};
