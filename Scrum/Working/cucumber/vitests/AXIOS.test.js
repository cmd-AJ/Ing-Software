import { test, expect } from 'vitest';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde .env

const api = axios.create({
  baseURL: `http://${process.env.VITE_API_HOSTI}:${process.env.VITE_PORTI}`,
});

test('should retrieve contacts for a given user ID', async () => {
  const userId = '3810 35859 0101'; // El ID de usuario que deseas probar
  const apiKey = process.env.VITE_API_KEY; // Obtener la API key de las variables de entorno

  try {
    const response = await api.get(`/contacts/${userId}`, {
      headers: {
        'api-key': apiKey,
      },
    });

    // Verificar que la respuesta tenga un código de éxito 200 OK
    expect(response.status).toBe(200);

    // Verificar que la respuesta sea un array y contenga los campos esperados
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data[0]).toHaveProperty('dpi');
    expect(response.data[0]).toHaveProperty('name');

    // Verificar que los valores sean los esperados
    expect(response.data[1].dpi).toBe('3833 86608 0102');
    expect(response.data[1].name).toBe('Ricardo Tapia');

  } catch (error) {
    throw new Error(`Failed with error: ${error.message}`);
  }
});
