import React, { useContext } from "react";
import { FavoriteContext } from "./favoriteContext.js/FavoriteContext";
import ImageCard from "./ImageCard";
import Pagination from "./Pagination";

const Dashboard = ({
  recordsToShow,
  paginate,
  onPaginationClicked,
  onAddFavorite,
}) => {
  const context = useContext(FavoriteContext);

  return (
    
    <div>
      <h1 className="title">Pokemon List</h1>
      <Pagination
        currentPage={paginate.page}
        itemsPerPage={paginate.pageSize}
        data={paginate.totalCount}
        onPaginationClicked={onPaginationClicked}
      ></Pagination>
      <div className="container-cards">
        {recordsToShow.map((record) => {
          let isFavorite = false;
          if (context !== null) {
            isFavorite =
              context.findIndex((pokemon) => pokemon.id === record.id) !== -1
                ? true
                : false;
          }
          return (
            <ImageCard
              key={record.id}
              pokemonData={record}
              onAddFavorite={onAddFavorite}
              isFavorite={isFavorite}
            ></ImageCard>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
