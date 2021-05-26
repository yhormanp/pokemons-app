import React, { useState } from "react";
import ImageCard from "./ImageCard";
import FilterInput from "./FilterInput";
import Pagination from "./Pagination";

const Favorite = ({
  paginate,
  onPaginationClicked,
  onAddFavorite,
  favoriteList,
}) => {
  const [serachTerm, setSerachTerm] = useState("");

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
            <FilterInput setSearchText={setSerachTerm}></FilterInput>
            <div className="container-cards">
              {favoriteList
                .filter((record) => {
                  if (serachTerm === "") {
                    return record;
                  } else if (record.name.indexOf(serachTerm) !== -1) {
                    return record;
                  }
                })
                .map((record) => {
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
