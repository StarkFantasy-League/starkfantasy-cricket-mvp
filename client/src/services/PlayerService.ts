import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // API server running on port 3000

export const getPlayers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cricket-player`);
    return response.data; // Devuelve los datos obtenidos de la API
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};
 
export const getPlayersTableStats = async (postion:string="") => {
  try {
    const response = await axios.get(`${BASE_URL}/cricket-player/stats?position=${postion}`);
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