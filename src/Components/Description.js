import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Description.css";
const Description = () => {
  let { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    async function getLocalStorageData() {
      const recordsShown = JSON.parse(
        window.localStorage.getItem("pokemon-temp-list")
      );
      console.log("recods shown", recordsShown);
      let pokemonDataIndex = recordsShown.findIndex((p) => p.id === +id);
      console.log("index", pokemonDataIndex, id);
      console.log("selected pokemon", recordsShown[pokemonDataIndex]);
      setPokemonData(recordsShown[pokemonDataIndex]);
    }

    getLocalStorageData();
  }, [id]);

  const description = (pokemonData) => {
    const name = pokemonData.name;
    const abilities = (pokemonData) => {
      return (
        <>
          {pokemonData.abilities.map((ability) => ability.ability.name + ", ")}
        </>
      );
    };

    const types = (pokemonData) => {
      return (
        <>{pokemonData.types.map((ability) => ability.type.name + ", ")}</>
      );
    };
    return (
      <>
        {name} is a pokemon type {types(pokemonData)} With abilities like{" "}
        {abilities(pokemonData)}
      </>
    );
  };

  return (
    <>
      {pokemonData && (
        <div className="description-container">
          <h1>{pokemonData.name}</h1>
          <img
            alt={pokemonData.name}
            className="description-image"
            src={pokemonData.sprites.front_default}
          ></img>
          <div className="description-text">
            {description(pokemonData)}
          </div>
        </div>
      )}
    </>
  );
};

export default Description;
