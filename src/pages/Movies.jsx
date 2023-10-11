import React, { useState } from 'react';
import css from './css/Pages.module.css';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearch } from '../api';
import { useEffect } from 'react';

export const Movies = () => {
  const [searchedMovie, setSearchedMovie] = useState([]);
  const [params, setSearchParams] = useSearchParams();
  const location = useLocation();

  const onFormSubmit = async event => {
    event.preventDefault();
    setSearchParams({ query: event.currentTarget.elements.searchWord.value });
  };

  const queryParamValue = params.get('query');

  useEffect(() => {
    if (queryParamValue === null) {
      return;
    }
    const fetchMoviesByTitle = async () => {
      try {
        const { results } = await getSearch(queryParamValue);
        setSearchedMovie(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMoviesByTitle();
  }, [queryParamValue]);

  return (
    <div>
      <h2 className={css.moviesTitle}>Find your movie</h2>

      <form onSubmit={onFormSubmit} className={css.formSubmit}>
        <input
          className={css.inputSearch}
          name="searchWord"
          type="text"
          placeholder="Search for a movie..."
          defaultValue={queryParamValue}
        />
        <button className="custom-btn btn-15">
          <span>Search</span>
        </button>
      </form>

      <div className={css.moviesSearchContainer}>
        <ul className={css.moviesSearchList}>
          {searchedMovie.map(movie => (
            <Link
              className={css.movieSearchLink}
              to={`/movies/${movie.id}`}
              key={movie.id}
              state={{ from: location }}
            >
              {movie.title || movie.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Movies;
