import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getMovieReviews } from '../api';
import css from './css/Pages.module.css';

const Reviews = () => {
  const [reviewData, setReviewData] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const fetchCast = async () => {
      try {
        const { results } = await getMovieReviews(movieId);
        setReviewData(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <ul className={css.reviewsList}>
        {reviewData.map(element => {
          const isoDate = `${element.updated_at}`;
          const date = new Date(isoDate);
          const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
          const formattedDate = date.toLocaleDateString('en-Us', options);
          return (
            <li className={css.reviewItem}>
              <h3>Author: {element.author}</h3>
              <p className={css.reviewContent}>{element.content}</p>
              <p className={css.dateComment}>
                Date of comment: {formattedDate}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
