import React, { useState } from 'react';
import { getTrending } from '../api';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import css from './css/Pages.module.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const { results } = await getTrending();
        setTrendingMovies(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h2 className={css.titleTrending}>Trending today</h2>

      <div className={css.moviesTrandingContainer}>
        <ul className={css.moviesTrandingList}>
          {trendingMovies.map(movie => (
            <Link
              className={css.movieSearchLink}
              to={`/movies/${movie.id}`}
              key={movie.id}
            >
              {movie.title || movie.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
