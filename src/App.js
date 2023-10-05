import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";

import MovieHeader from "./components/MovieHeader";

import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";
import EditMovieForm from "./components/EditMovieForm";
import { useParams } from "react-router-dom";
import { useAxios } from "./hooks/useAxios";
import { useHistory } from "react-router-dom/";
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const { push } = useHistory();
  const [darkMode, setDarkMode] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movieData, getMovies, loading, err] = useAxios({
    reqType: "get",
    endpoint: "movies",
  });

  useEffect(() => {
    getMovies()
      .then((res) => {
        console.log(res);
        setMovies(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovies(res.data);
        push("/movies");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const addToFavorites = (movie) => {
    const oldMovie = favoriteMovies.find((item) => item.id === movie.id);
    if (!oldMovie) {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  return (
    <div className={darkMode && "dark bg-black h-screen"}>
      <nav className="bg-zinc-800 px-6 py-3 dark:bg-red-800">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          Dark Mode: On/Off
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route exact path="/movies/add">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route exact path="/movies/:id">
              <Movie
                deleteMovie={deleteMovie}
                addToFavorites={addToFavorites}
              />
            </Route>

            <Route exact path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route exact path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
