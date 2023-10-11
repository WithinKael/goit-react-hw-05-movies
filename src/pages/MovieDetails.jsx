import React, { Suspense, useRef, useState, lazy } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner';
import { getMovieDetails } from '../api';
import { useEffect } from 'react';
import css from './css/Pages.module.css';

const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location?.state?.from ?? '/');

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const fetchMoviesById = async () => {
      try {
        const result = await getMovieDetails(movieId);
        setMovieData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMoviesById();
  }, [movieId]);

  const voteProcent = (movieData?.vote_average * 10).toFixed(2);
  const genres = movieData?.genres
    ?.map(genre => {
      return genre.name;
    })
    ?.join(', ');

  const releaseData = movieData?.release_date?.slice(0, 4);

  return (
    <div>
      <Link to={backLinkRef.current} className={css.backLink}>
        Go back
      </Link>
      {movieData ? (
        <div className={css.movieDetailWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w342${movieData.poster_path}`}
            alt={movieData.title}
            className={css.imageMovieDetail}
          />
          <div>
            <h1>
              {movieData.title} ({releaseData})
            </h1>
            <p>User score: {voteProcent}%</p>
            <h2>Overview</h2>
            <p>{movieData.overview}</p>
            <h3>Genres</h3>
            <p>{genres}</p>
          </div>
        </div>
      ) : null}
      <div className={css.containerCast}>
        <NavLink to="cast" className={css.navlink}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={css.navlink}>
          Reviews
        </NavLink>
      </div>
      <Suspense
        fallback={
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{
              position: 'fixed',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        }
      >
        <Routes>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetails;
