"use client"
import { useState, useEffect } from "react";
import { PokemonDetails } from "@/app/interface/pokemon";
import Image from "next/image";
import { usePathname } from "next/navigation";

const PokemonDetails: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const path: string = usePathname();
  const idPath: string | undefined = path.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPath}`);
        const data: PokemonDetails = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    if (idPath) {
      fetchData();
    }
  }, [idPath]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { name, height, weight, types, id, sprites } = pokemon;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col bg-white rounded-xl mt-14 py-6">
      <Image
        width={350}
        height={350}
        src={sprites.other["official-artwork"].front_default}
        alt={name}
        className="mb-4"
      />
      <ul className="ml-10 text-[#780000]">
        <li><span className="font-semibold text-[#003049]">ID : </span>{id}</li>
        <li><span className="font-semibold text-[#003049]">Name : </span>{name.replace(/^\w/, (c) => c.toUpperCase())}</li>
        <li><span className="font-semibold text-[#003049]">Height : </span>{height}</li>
        <li><span className="font-semibold text-[#003049]">Weight : </span>{weight}</li>
        <li><span className="font-semibold text-[#003049]">Type : </span>{types.map(({ type }) => type.name).join(", ")}</li>
      </ul>
      </div>
      
    </div>
  );
};

export default PokemonDetails;