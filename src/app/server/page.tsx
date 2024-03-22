"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pokemon, PokemonListProps } from "../interface/pokemon";

const PokemonList: React.FC<PokemonListProps> = () => {
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`);
                const data = await response.json();
                setPokemons(data.results);
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
            }
        };

        fetchData();
    }, []);

    if (!pokemons) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex flex-row pl-6 py-3 mt-6 mb-12 justify-center">
                <Image 
                src={"/pokeball.png"}
                alt="pokeball"
                width={80}
                height={80}
                />
                <h1 className="text-5xl font-semibold mt-4">Pokemon Page Server</h1>
            </div>
            <ul className="flex flex-row flex-wrap gap-9 justify-center mb-6">
                {pokemons.map(({ name, url }, index) => (
                    <li className="shadow-lg rounded-md text-center py-4 px-10 bg-white" key={index}>
                        <Image
                            width={100}
                            height={100}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${url.split("/").slice(-2, -1)}.png`}
                            alt={name}
                            className="mb-4"
                        />
                        <h6 className="text-[#780000] font-medium">{name.replace(/^\w/, (c) => c.toUpperCase())}</h6>
                        <Link href={`/client/${url.split("/").slice(-2, -1)}`}>
                            <button className="mt-3 py-1 px-5 text-white bg-[#003049] rounded-lg hover:">Details</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PokemonList;
