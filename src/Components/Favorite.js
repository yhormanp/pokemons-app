import React, { useContext } from "react";
import ImageCard from "./ImageCard";
import Pagination from "./Pagination";

const Favorite = ({ paginate, onPaginationClicked, onAddFavorite , favoriteList}) => {
  return (
    <>
      <div>
        <h1 className="title">Pokemon Favorite List</h1>
        {favoriteList && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default Favorite;
