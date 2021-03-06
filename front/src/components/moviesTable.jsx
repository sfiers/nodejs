import React, { useState } from "react";
import {Link} from 'react-router-dom';
import Like from "./common/like";
import Table from "./common/table";


function MoviesTable({ movies, onLike, onDelete, onSort, sortColumn }) {
  const columns = [
    { path: "title", label: "Title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "heart",
      content: (movie) => (
        <Like liked={movie.liked} onLikeToggle={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table columns={columns} onSort={onSort} sortColumn={sortColumn} data={movies} />
  );
}

export default MoviesTable;
