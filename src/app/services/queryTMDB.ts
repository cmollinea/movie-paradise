export type ApiError = {
  status: number;
  statusText: string;
};

export const queryTMDB = async <T>(
  url: string
): Promise<T | ApiError | undefined> => {
  try {
    const response = await fetch(url);
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
