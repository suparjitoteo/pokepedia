import { PaginationType } from "@type/common-type";
import { INamedResponse, IPokemon } from "@type/pokemon-type";
import { fetcher } from "./fetcher";

export const getPokemonList = async ({
  offset = 0,
  limit = 25,
}: {
  offset?: number;
  limit?: number;
}) => {
  const data = await fetcher<PaginationType<INamedResponse>>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );

  return data;
};

export const getPokemonByName = async ({ name }: { name: string }) => {
  const data = await fetcher<IPokemon>(`/pokemon/${name}`);

  return data;
};
