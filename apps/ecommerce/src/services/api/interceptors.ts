import { ApiError } from "./config";

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API Error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data as T;
}

export const createApiRequest = (
  endpoint: string,
  options: RequestInit = {}
): Request => {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Request(endpoint, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });
};

export const requestInterceptor = (config: RequestInit): RequestInit => {
  return {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
  };
};
