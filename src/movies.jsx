import React, { Component } from "react";
import { getMovies, deleteMovie } from "./services/movieService.js";
import { getGenres } from "./services/genreService";
import MoviesTable from "./components/moviesTable";
import Pagenation from "./components/pagination";
import { paginate } from "./util/paginate";
import ListGroup from "./components/listGroup";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./components/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", _id: "" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sortedMovies = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

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
  deleteButton = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("this movie has already been deleted!");
        this.setState({ movies: originalMovies });
      }
    }
  };
  handleSearch = query => {
    console.log(query);
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      sortColumn,
      searchQuery
    } = this.state;
    console.log("this is render");
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
            <Link className="btn btn-primary" to="movies/new">
              New Movie
            </Link>
            <p>there are {totalCount} movies</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
}
export default Movies;
