// api.js
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
const BASE_URL = "https://api.kinopoisk.dev/v1.4";

const today = new Date();
const year = today.getFullYear();

export const getPopularMovies = async (page = 1) => { // Add page parameter
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'X-API-KEY': API_KEY }
    };
    const response = await fetch(
        `${BASE_URL}/movie?sortField=votes.kp&sortType=-1&year=${year}&rating.kp>=1&limit=15&page=${page}`, // Add page to URL
        options
    );

    return await response.json();
};

export const searchMovies = async (query, page = 1) => { // Add page parameter
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'X-API-KEY': API_KEY }
    };
    const response = await fetch(
        `${BASE_URL}/movie/search?&query=${encodeURIComponent(query)}&page=${page}`, // Add page to URL
        options
    );

    return await response.json();
};
