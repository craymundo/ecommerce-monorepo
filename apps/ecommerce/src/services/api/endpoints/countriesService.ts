import { API_CONFIG } from "../config";
import { handleApiResponse } from "../interceptors";
import { Country } from "../../../types/api.types";
import { ApiCache } from "../cache";

const CACHE_KEY = "american-countries";

export class CountriesService {
  private static cache: ApiCache = ApiCache.getInstance();

  static async getAmericanCountries(): Promise<string[]> {
    try {
      // Intentar obtener datos del cache
      const cachedData = this.cache.get<string[]>(CACHE_KEY);
      if (cachedData) {
        return cachedData;
      }

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AMERICAS}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.statusText}`);
      }

      const countries: Country[] = await handleApiResponse<Country[]>(response);
      const formattedCountries = this.formatCountries(countries);

      // Guardar en cache
      this.cache.set(CACHE_KEY, formattedCountries);

      return formattedCountries;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static formatCountries(countries: Country[]): string[] {
    return countries
      .map((country) => country.name.common)
      .sort((a, b) => a.localeCompare(b));
  }

  private static handleError(error: unknown): Error {
    if (error instanceof Error) {
      return new Error(`Error fetching countries: ${error.message}`);
    }
    return new Error("Unknown error fetching countries");
  }
}
