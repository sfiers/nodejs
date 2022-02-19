import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    setGenres([{ _id: "", name: "All Genres" }, ...getGenres()]);
    setMovies(getMovies());
  }, []);

  const handleDelete = (movie) => {
    setMovies(movies.filter((m) => m._id !== movie._id));
  };

  const handleLike = (movie) => {
    const tempMovies = [...movies];
    const index = movies.indexOf(movie);
    tempMovies[index].liked = !tempMovies[index].liked;
    setMovies(tempMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (tempSortColumn) => {
    setSortColumn(tempSortColumn);
  };

  const getPagedData = () => {
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const moviesToRender = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: moviesToRender };
  };

  const { length: count } = movies;
  if (count === 0) {
    return <p>There are no movies in the database.</p>;
  }

  const { totalCount, data: moviesToRender } = getPagedData();

  return (
    <main className="container">
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={(genre) => handleGenreSelect(genre)}
            selectedItem={selectedGenre}
            // valueProperty="_id"
            // textProperty="name"
          />
        </div>
        <div className="col">
          <p>There are {totalCount} movies in the database.</p>
          <MoviesTable
            movies={moviesToRender}
            sortColumn={sortColumn}
            onLike={(movie) => handleLike(movie)}
            onDelete={(movie) => handleDelete(movie)}
            onSort={(path) => handleSort(path)}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={(page) => handlePageChange(page)}
          />
        </div>
      </div>
    </main>
  );
}

export default Movies;
