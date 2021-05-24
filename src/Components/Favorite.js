import React, { useContext } from "react";
import { FavoriteContext } from "./favoriteContext.js/FavoriteContext";
import ImageCard from "./ImageCard";
import Pagination from "./Pagination";

const Favorite = ({ paginate, onPaginationClicked, onAddFavorite }) => {
  const favoriteList = useContext(FavoriteContext);

  return (
    <div>
      <h1 className="title">Pokemon Favorite List</h1>
      <Pagination
        currentPage={paginate.page}
        itemsPerPage={paginate.pageSize}
        data={favoriteList.length}
        onPaginationClicked={onPaginationClicked}
      ></Pagination>
      <div className="container-cards">
        {favoriteList.map((record) => {
          return (
            <ImageCard
              key={record.id}
              pokemonData={record}
              onAddFavorite={onAddFavorite}
              isFavorite={record.isFavorite}
            ></ImageCard>
          );
        })}
      </div>
    </div>
  );
};

export default Favorite;
