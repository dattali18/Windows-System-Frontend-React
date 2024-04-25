import axios from "axios";
import { BASE_URL } from "./config.ts";

// Function to get a list of all libraries
export const getAllLibraries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Libraries`);
    return response.data;
  } catch (error) {
    console.error("Error getting libraries:", error);
    throw error;
  }
};

// Function to get a library by ID
export const getLibraryById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/Libraries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting library with ID ${id}:`, error);
    throw error;
  }
};

// Function to search libraries by name
export const searchLibrariesByName = async (name: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/Libraries/search/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching libraries by name ${name}:`, error);
    throw error;
  }
};

// Function to search libraries by name and keywords
export const searchLibrariesByNameAndKeywords = async (
  name: string,
  keywords: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/Libraries/search?name=${name}&keywords=${keywords}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error searching libraries by name ${name} and keywords ${keywords}:`,
      error
    );
    throw error;
  }
};

// Function to create a new library
export const createLibrary = async (library: {
  name: string;
  keywords: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/Libraries`, library);
    return response.data;
  } catch (error) {
    console.error("Error creating library:", error);
    throw error;
  }
};

// Function to update a library
export const updateLibrary = async (
  id: string,
  library: { name: string; keywords: string }
) => {
  try {
    const response = await axios.put(`${BASE_URL}/Libraries/${id}`, library);
    return response.data;
  } catch (error) {
    console.error(`Error updating library with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a library
export const deleteLibrary = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/Libraries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting library with ID ${id}:`, error);
    throw error;
  }
};

// Function to get all movies in a library
export const getMoviesInLibrary = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/Libraries/${id}/movies`);
    return response.data;
  } catch (error) {
    console.error(`Error getting movies in library with ID ${id}:`, error);
    throw error;
  }
};

// Function to get all TV series in a library
export const getTvSeriesInLibrary = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/Libraries/${id}/tvseries`);
    return response.data;
  } catch (error) {
    console.error(`Error getting TV series in library with ID ${id}:`, error);
    throw error;
  }
};

// Function to add a movie to a library
export const addMovieToLibrary = async (libraryId: string, imdbID: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/Libraries/${libraryId}/movies?imdbID=${imdbID}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error adding movie with imdbID ${imdbID} to library with ID ${libraryId}:`,
      error
    );
    throw error;
  }
};

// Function to add a TV series to a library
export const addTvSeriesToLibrary = async (
  libraryId: string,
  imdbID: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/Libraries/${libraryId}/tvseries?imdbID=${imdbID}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error adding TV series with imdbID ${imdbID} to library with ID ${libraryId}:`,
      error
    );
    throw error;
  }
};

// Function to delete a movie from a library
export const deleteMovieFromLibrary = async (
  libraryId: string,
  imdbID: string
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/Libraries/${libraryId}/movies?imdbID=${imdbID}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting movie with imdbID ${imdbID} from library with ID ${libraryId}:`,
      error
    );
    throw error;
  }
};

// Function to delete a TV series from a library
export const deleteTvSeriesFromLibrary = async (
  libraryId: string,
  imdbID: string
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/Libraries/${libraryId}/tvseries?imdbID=${imdbID}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting TV series with imdbID ${imdbID} from library with ID ${libraryId}:`,
      error
    );
    throw error;
  }
};
