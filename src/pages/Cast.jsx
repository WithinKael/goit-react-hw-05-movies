import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../api';
import css from './css/Pages.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [castData, setCastData] = useState();

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const fetchCast = async () => {
      try {
        const { cast } = await getMovieCredits(movieId);
        setCastData(cast);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <ul className={css.castList}>
        {castData?.slice(0, 35).map(element => {
          const profilePath = element.profile_path
            ? `https://image.tmdb.org/t/p/w342${element.profile_path}`
            : 'https://w7.pngwing.com/pngs/844/95/png-transparent-anonymity-person-computer-icons-word-of-mouth-silhouette-business-internet-thumbnail.png';
          return (
            <li key={element.credit_id} className={css.CastItem}>
              <div className={css.paragraphContainer}>
                <p>Name: {element.name}</p>
                <p>Character: {element.character}</p>
                <img className={css.imageCast} src={profilePath} alt="" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cast;
