export const API_CONFIG = {
  BASE_URL: "https://restcountries.com/v3.1",
  ENDPOINTS: {
    AMERICAS: "/region/americas",
  },
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}
