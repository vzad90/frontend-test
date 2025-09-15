import axios from 'axios'
import { config } from '../config/env'
import type { Movie } from '../utils/global.types'

export const getUserMovies = async (username: string, signal?: AbortSignal): Promise<Movie[]> => {
  try {
    const res = await axios.get(`${config.USER_MOVIES_URL}?username=${username}`, { signal });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.name === 'CanceledError') {
      throw error;
    }
    console.error('Error fetching user movies:', error);
    return [];
  }
};

export const addOrUpdateUserMovie = async (username: string, movie: Movie) => {
  try {
    await axios.post(config.USER_MOVIES_URL, { username, movie });
  } catch (err) {
    console.error('Error adding/updating user movie:', err);
  }
};

export const deleteUserMovie = async (username: string, movieId: string) => {
  try {
    await axios.delete(config.USER_MOVIES_URL, { data: { username, movieId } });
  } catch (err) {
    console.error('Error deleting user movie:', err);
  }
};
