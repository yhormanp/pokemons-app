import React, { useState } from "react";
import FilterInput from "./FilterInput";
import ImageCard from "./ImageCard";
import Pagination from "./Pagination";

const Dashboard = ({
  recordsToShow,
  paginate,
  onPaginationClicked,
  onAddFavorite,
  favoriteList,
}) => {
  const [serachTerm, setSerachTerm] = useState("");

  return (
    <div>
      <h1 className="title">Pokemon List</h1>
      {recordsToShow && (
        <>
          <Pagination
            currentPage={paginate.page}
            itemsPerPage={paginate.pageSize}
            data={paginate.totalCount}
            onPaginationClicked={onPaginationClicked}
          ></Pagination>
          <FilterInput setSearchText={setSerachTerm}></FilterInput>
          <div className="container-cards">
            {recordsToShow
              .filter((record) => {
                if (serachTerm === "") {
                  return record;
                } else if (record.name.indexOf(serachTerm) !== -1) {
                  return record;
                }
              })
              .map((record) => {
                let isFavorite = false;
                if (
                  favoriteList &&
                  favoriteList.length > 0 &&
                  favoriteList !== null
                ) {
                  isFavorite =
                    favoriteList.findIndex(
                      (pokemon) => pokemon.id === record.id
                    ) !== -1
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
