import { IPokemon } from "@type/pokemon-type";
import PouchDB from "pouchdb";
const db = new PouchDB("pokemon", { size: 50 });

export const getPokemonTotal = async () => {
  return await db.info();
};

export const getAllPokemon = async ({ limit }: { limit?: number } = {}) => {
  const data = await db.allDocs({
    include_docs: true,
    limit: limit ?? 100,
  });

  const transformData = data.rows.map((t) => ({
    ...t.doc,
    _rev: t.value.rev,
  })) as unknown as IPokemon[];

  return transformData;
};

export const addPokemon = async (pokemon: IPokemon) => {
  const poke = { ...pokemon, _id: pokemon.nickname?.toLowerCase().trim() };
  return await db.put(poke);
};

export const deletePokemons = async (
  pokemonList: { nickname: string; rev: string }[]
) => {
  try {
    const transformData = pokemonList.map((pokemon) => ({
      _id: pokemon.nickname,
      _rev: pokemon.rev,
      _deleted: true,
    }));
    const data = await db.bulkDocs(transformData);

    return data;
  } catch (error: any) {
    throw new Error(`Error when removing pokemon. ${error.reason}`);
  }
};

export const isExist = async (nickname: string) => {
  try {
    const data = await db.get(nickname.toLowerCase());
    return !!data._id;
  } catch (error: any) {
    if (error.status === 404) {
      return false;
    } else {
      throw new Error(`Something went wrong: ${error.reason}`);
    }
  }
};
