import axios from "axios";
import { BASE_URL } from "./config.ts";

const getTvSeries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/TvSeries/`);
    return response.data;
  } catch (error) {
    console.error("Error getting TV series:", error);
    throw error;
  }
};

const getTvSeriesById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/TvSeries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting TV series with id ${id}:`, error);
    throw error;
  }
};

const searchTvSeries = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/TvSeries/search/?s=${query}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error searching TV series with query ${query}`,
      error
    );
    throw error;
  }
};

const getTvSeriesByImdbId = async (imdbId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/TvSeries/search/${imdbId}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching TV series with imdbId ${imdbId}:`, error);
    throw error;
  }
};

const addTvSeries = async (imdbId: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/TvSeries/?imdbID=${imdbId}`);
    return response.data;
  } catch (error) {
    console.error(`Error adding TV series with imdbId ${imdbId}:`, error);
    throw error;
  }
};

export {
  addTvSeries,
  getTvSeries,
  getTvSeriesById,
  searchTvSeries,
  getTvSeriesByImdbId,
};
