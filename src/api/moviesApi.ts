import axios from "axios";
import { BASE_URL } from "./config.ts";

// Function to get all movies
const getAllMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Movies`);
    return response.data;
  } catch (error) {
    console.error("Error getting all movies:", error);
    throw error;
  }
};

// Function to get a movie by id
const getMovieById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/Movies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting movie with id ${id}:`, error);
    throw error;
  }
};

// Function to search movies by title and year
const searchMovies = async (title: string, year: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/Movies/search/?s=${title}&y=${year}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error searching movies with title ${title} and year ${year}:`,
      error
    );
    throw error;
  }
};

// Function to get a movie by imdbID
const getMovieByImdbID = async (imdbID: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/Movies/search/${imdbID}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting movie with imdbID ${imdbID}:`, error);
    throw error;
  }
};

// Function to add a movie to the database
const addMovie = async (imdbID: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/Movies/?imdbID=${imdbID}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error adding movie with imdbID ${imdbID} to the database:`,
      error
    );
    throw error;
  }
};

export { addMovie, getAllMovies, getMovieById, getMovieByImdbID, searchMovies };
