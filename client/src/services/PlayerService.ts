import axios from 'axios';
const BASE_URL = 'http://localhost:3000';
import { PaginatedPlayerStats, HomeData } from '../types';


export const getPlayers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cricket-player`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

export const getPlayersTableStats = async (
  position: string = "",
  page: number = 1,
  limit: number = 10
): Promise<PaginatedPlayerStats> => {
try {
  const response = await axios.get(`${BASE_URL}/cricket-player/stats`, {
      params: {
          position,
          page,
          limit
      }
  });
  return response.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("Axios error details:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
  }
  throw error;
}
};

export const getPlayerStat = async (id:string) => {
  try {
    const response = await axios.get(`${BASE_URL}/cricket-player/radar/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }
    throw error;
  }
};

export const getTeams = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cricket-team`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }
    throw error;
  }
};

export const getPlayerTableStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cricket-player/table-stats`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }
    throw error;
  }
};


export const getHomeData = async (): Promise<HomeData> => {
  try {
    const response = await axios.get(`${BASE_URL}/cricket-player/home-data`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching home data:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    } else {
      console.error("Unexpected error fetching home data:", error);
    }
    throw error;
  }
};
