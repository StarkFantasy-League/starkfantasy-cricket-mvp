import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // API server running on port 3000

export const getMatches = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cricket-match`);
    return response.data; // Devuelve los datos obtenidos de la API
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};