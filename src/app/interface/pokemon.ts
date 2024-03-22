interface Pokemon {
    name: string;
    url: string;
};

interface PokemonListProps {
  pokemons: Pokemon[];
  fetchPokemons: () => void;
}

interface PokemonDetails {
    name: string;
    height: number;
    weight: number;
    types: { type: { name: string } }[];
    id: number;
    sprites: {
      front_default: string;
      other: {
        "official-artwork": { front_default: string};
      };
    };
}

export type { Pokemon, PokemonListProps, PokemonDetails };
