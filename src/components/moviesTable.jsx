import React, { Component } from "react";
import Like from "./like";
import Table from "./table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title} </Link>
    },
    { path: "genre.name", label: "Name" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick1={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { movies, onDelete, sortColumn, onSort } = this.props;
    // console.log(movies);
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
        onDelete={onDelete}
      />
    );
  }
}

export default MoviesTable;
