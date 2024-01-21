export type ApiError = {
  status: number;
  statusText: string;
};

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_SECRET_TOKEN as string}`
  }
};

/**
 * Realiza una solicitud a la API de TMDB y devuelve los datos de la respuesta.
 *
 * @template T El tipo de datos que se espera de la respuesta de la API.
 * @param {string} url La URL de la API a la que se realizará la solicitud.
 * @return {Promise<T | ApiError | undefined>} Devuelve una promesa que se resuelve con los datos de la respuesta,
 * un objeto de error si la respuesta no es correcta, o undefined si ocurre un error durante la solicitud.
 *
 * @throws {Error} Si ocurre un error durante la solicitud, se registra en la consola.
 */

export const queryTMDB = async <T>(
  url: string
): Promise<T | ApiError | undefined> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      return {
        status: response.status,
        statusText: response.statusText
      };
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
