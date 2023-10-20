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
