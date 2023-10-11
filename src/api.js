// 'tranding' 'https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=ffcb5f8bb28c38ae40b5cc0ef24c94f1';
// 'search'  'https://api.themoviedb.org/3/search/movie?query=&include_adult=false&language=en-US&page=1&api_key=ffcb5f8bb28c38ae40b5cc0ef24c94f1'

import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const getTrending = async () => {
  const { data } = await axios.get('trending/all/day', {
    params: {
      language: 'en-US',
      api_key: 'ffcb5f8bb28c38ae40b5cc0ef24c94f1',
    },
  });
  return data;
};

export const getSearch = async query => {
  const { data } = await axios.get('search/movie', {
    params: {
      query: `${query}`,
      include_adult: false,
      page: 1,
      language: 'en-US',
      api_key: 'ffcb5f8bb28c38ae40b5cc0ef24c94f1',
    },
  });
  return data;
};

export const getMovieDetails = async movieId => {
  const { data } = await axios.get(`movie/${movieId}`, {
    params: {
      language: 'en-US',
      api_key: 'ffcb5f8bb28c38ae40b5cc0ef24c94f1',
    },
  });
  return data;
};

export const getMovieCredits = async movieId => {
  const { data } = await axios.get(`movie/${movieId}/credits`, {
    params: {
      language: 'en-US',
      api_key: 'ffcb5f8bb28c38ae40b5cc0ef24c94f1',
    },
  });
  return data;
};

export const getMovieReviews = async movieId => {
  const { data } = await axios.get(`movie/${movieId}/reviews`, {
    params: {
      language: 'en-US',
      api_key: 'ffcb5f8bb28c38ae40b5cc0ef24c94f1',
    },
  });
  return data;
};
