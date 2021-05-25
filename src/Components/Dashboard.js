import React from "react";
import ImageCard from "./ImageCard";
import Pagination from "./Pagination";

const Dashboard = ({
  recordsToShow,
  paginate,
  onPaginationClicked,
  onAddFavorite,
  favoriteList,
}) => {
  const context = favoriteList;
  return (
    <div>
      <h1 className="title">Pokemon List</h1>
      { recordsToShow && (
        <>
          <Pagination
            currentPage={paginate.page}
            itemsPerPage={paginate.pageSize}
            data={paginate.totalCount}
            onPaginationClicked={onPaginationClicked}
          ></Pagination>
          <div className="container-cards">
            {recordsToShow.map((record) => {
              let isFavorite = false;
              if (context && context.length > 0 && context !== null) {
                isFavorite =
                  context.findIndex((pokemon) => pokemon.id === record.id) !==
                  -1
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
