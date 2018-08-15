import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService.js";
import { getGenres } from "./services/fakeGenreService";
import MoviesTable from "./components/moviesTable";
import Pagenation from "./components/pagination";
import { paginate } from "./util/paginate";
import ListGroup from "./components/listGroup";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, genres, sortColumn } = this.state;

    if (count === 0) return <p>there is no movies</p>;
    const { totalCount, data } = this.getPagedData();
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col">
            <p>there are {totalCount} movies</p>
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onDelete={this.deleteButton}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagenation
              itemCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleLike = movie => {
    console.log("like it", movie);
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  deleteButton = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };
}
export default Movies;
