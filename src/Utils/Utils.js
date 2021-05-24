
  const registerFavoritePokemonOnLocalStrg = (newFavoriteList) => {

    window.localStorage.setItem(
      "pokemon-favorite-list",
      JSON.stringify(newFavoriteList)
    );
  };

  
  const registerTempRecordsToShowOnLocalStrg = (recordsToShow) => {

    window.localStorage.setItem(
      "pokemon-temp-list",
      JSON.stringify(recordsToShow)
    );
  };

  export {
    registerFavoritePokemonOnLocalStrg,
    registerTempRecordsToShowOnLocalStrg
  }