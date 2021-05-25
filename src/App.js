import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import React, { useState, useEffect } from "react";

import "./App.css";
import Dashboard from "./Components/Dashboard";
import SignIn from "./Components/SignIn";
import Favorite from "./Components/Favorite";
import SharedLayout from "./Components/SharedLayout";
import { getPokemons } from "./Services/pokemonsApi";
import Description from "./Components/Description";
import { registerTempStateOnLocalStrg } from "./Utils/Utils";

function App() {
  const [generalState, setGeneralState] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  // GETTING POKEMONS BY PAGE
  useEffect(() => {
    async function fetchTempState() {
      const currentState = JSON.parse(
        window.localStorage.getItem("pokemon-temp-list")
      );
      if (currentState) {
        setGeneralState(currentState);
        setCurrentPage(currentState.paginate.page);
      } else {
        setGeneralState({
          paginate: {
            page: 1,
            pageSize: 20,
            totalCount: 0,
          },
        });
        setCurrentPage(1);
      }
    }
    fetchTempState();
  }, []);

  useEffect(async () => {
    await fetchNextPageData();
  }, [currentPage]);

  async function fetchNextPageData() {
    if (generalState.paginate) {
      const { data, totalCount } = await getPokemons(
        generalState.paginate.page
      );
      const paginateModified = {
        ...generalState.paginate,
        totalCount: totalCount,
      };
      const newState = {
        ...generalState,
        recordsToShow: data,
        paginate: paginateModified,
      };
      setGeneralState(newState);
      registerTempStateOnLocalStrg(newState);
    }
  }

  const onPaginationClicked = (newPageIndex) => {
    const paginateModified = { ...generalState.paginate, page: newPageIndex };
    setGeneralState((prevState) => {
      return { ...prevState, paginate: paginateModified };
    });

    setCurrentPage(newPageIndex);
  };

  const registerFavoritePokemon = (newFavoriteList) => {
    const newState = { ...generalState, favoriteList: newFavoriteList };
    setGeneralState(newState);
    registerTempStateOnLocalStrg(newState);
  };

  const onAddFavorite = (pokemonData, isFavorite) => {
    const favoriteList = generalState.favoriteList;
    if (!isFavorite) {
      // ADD TO FAVORITES
      if (favoriteList && favoriteList.length > 0) {
        const favoriteIndex = favoriteList.findIndex(
          (pokemon) => pokemon.id === pokemonData.id
        );
        if (favoriteIndex >= 0) {
          console.log("already exists");
          return;
        }
        const pokemonModified = { ...pokemonData, isFavorite: true };
        const newFavoriteList = favoriteList.concat([{ ...pokemonModified }]);
        // register in the localstorage and useState
        registerFavoritePokemon(newFavoriteList);
      } else {
        // add it first time
        const pokemonModified = { ...pokemonData, isFavorite: true };
        const newFavoriteList = [{ ...pokemonModified }];

        // register in the localstorage and useState
        registerFavoritePokemon(newFavoriteList);
      }
    } else {
      // REMOVE FROM FAVORITES
      const favoriteToRemove = favoriteList.findIndex(
        (pokemon) => pokemon.id === pokemonData.id
      );

      let newFavoriteList = [
        ...favoriteList.slice(0, favoriteToRemove),
        ...favoriteList.slice(favoriteToRemove + 1),
      ];

      registerFavoritePokemon(newFavoriteList);
    }
  };
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <SignIn></SignIn>
          </Route>

          <Route path="/home">
            <Dashboard
              paginate={generalState.paginate}
              onPaginationClicked={onPaginationClicked}
              onAddFavorite={onAddFavorite}
              recordsToShow={generalState.recordsToShow}
              favoriteList={generalState.favoriteList}
            ></Dashboard>
            <SharedLayout></SharedLayout>
          </Route>
          <Route path="/favorites">
            <Favorite
              paginate={generalState.paginate}
              onPaginationClicked={onPaginationClicked}
              onAddFavorite={onAddFavorite}
              favoriteList={generalState.favoriteList}
            ></Favorite>
            <SharedLayout></SharedLayout>
          </Route>
          <Route path="/description/:id" component={Description}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
