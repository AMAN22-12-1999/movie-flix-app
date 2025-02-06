import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchTerm = '', type = '') => {
  const query = searchTerm ? `s=${searchTerm}` : 's=movie'; 
  const typeParam = type !== '' ? `&type=${type}` : ''; 
  
  try {
    const response1 = await axios.get(`${BASE_URL}?${query}&apikey=${API_KEY}&page=1${typeParam}`);
    const moviesPage1 = response1.data.Search || [];

    
    const response2 = await axios.get(`${BASE_URL}?${query}&apikey=${API_KEY}&page=2${typeParam}`);
    const moviesPage2 = response2.data.Search || [];

   
    return [...moviesPage1, ...moviesPage2].slice(0, 12);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return []; 
  }
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
  return response.data;
};
