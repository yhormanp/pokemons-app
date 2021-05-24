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
import { getPokemons, getFavoriteList } from "./Services/pokemonsApi";
import Description from "./Components/Description";
import { FavoriteContext } from "./Components/favoriteContext.js/FavoriteContext";
import { UserContext } from "./Components/UserContext/UserContext";
import { registerFavoritePokemonOnLocalStrg , registerTempRecordsToShowOnLocalStrg} from './Utils/Utils'

function App() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [userContext, setUserContext] = useState(null);
  const [recordsToShow, setRecordsToShow] = useState([]);
  const [paginateData, setPaginateData] = useState({
    page: 1,
    pageSize: 20,
    totalCount: 0,
  });
  // GETTING POKEMONS BY PAGE
  useEffect(() => {
    async function fetchData() {
      const { data, totalCount } = await getPokemons(paginateData.page);
      setRecordsToShow(data);
      console.log('registering, ', data, paginateData.page)
      registerTempRecordsToShowOnLocalStrg(data);
      setPaginateData((prevState) => {
        return { ...prevState, totalCount: totalCount };
      });
    }
    fetchData();
  }, [paginateData.page]);

  // GETTING FAVORITE LIST
  useEffect(() => {
    async function fetchFavoriteList() {
      const data = await getFavoriteList();
      setFavoriteList(JSON.parse(data));
    }
    fetchFavoriteList();
  }, []);

  const onPaginationClicked = (newPageIndex) => {
    setPaginateData((prevState) => {
      return { ...prevState, page: newPageIndex };
    });
  };

  const registerFavoritePokemon = (newFavoriteList) => {
    setFavoriteList(newFavoriteList);

    registerFavoritePokemonOnLocalStrg(newFavoriteList);
   
  };

  const onAddFavorite = (pokemonData, isFavorite) => {
    if (!isFavorite) {
      // ADD TO FAVORITES

      if (favoriteList != null) {
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
            <SignIn onSetUserContext={setUserContext}></SignIn>
          </Route>
          <UserContext.Provider value={userContext}>
            <FavoriteContext.Provider value={favoriteList}>
              <SharedLayout userContextData={userContext}></SharedLayout>
              <Route path="/home">
                <Dashboard
                  paginate={paginateData}
                  onPaginationClicked={onPaginationClicked}
                  onAddFavorite={onAddFavorite}
                  recordsToShow={recordsToShow}
                ></Dashboard>
              </Route>
              <Route path="/favorites">
                <Favorite
                  paginate={paginateData}
                  onPaginationClicked={onPaginationClicked}
                  onAddFavorite={onAddFavorite}
                ></Favorite>
              </Route>
              <Route path="/description/:id" component={Description}></Route>
            </FavoriteContext.Provider>
          </UserContext.Provider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
