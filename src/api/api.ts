import axios from "axios";
import { IPokemon } from "../interfaces/interfaces";

axios.defaults.baseURL = "https://pokeapi.co/api/v2";

const fetchPokemonDetails = async (url: string): Promise<IPokemon | null> => {
  try {
    const { data } = await axios.get(url);
    return {
      id: data.id,
      type: data.type,
      name: data.name,
      sprite: data.sprites.front_default,
    };
  } catch (error) {
    console.error(`Error fetching details for ${url}:`, error);
    return null;
  }
};

export const fetchPokemons = async (): Promise<IPokemon[]> => {
  try {
    const { data } = await axios.get("pokemon?limit=30");
    const pokemonList = data.results as { name: string; url: string }[];

    const detailedPokemons = await Promise.all(
      pokemonList.map(({ url }) => fetchPokemonDetails(url))
    );

    return detailedPokemons.filter(
      (pokemon): pokemon is IPokemon => pokemon !== null
    );
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
};
