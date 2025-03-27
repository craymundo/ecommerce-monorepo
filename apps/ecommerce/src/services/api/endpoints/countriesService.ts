import { API_CONFIG } from "../config";
import { handleApiResponse } from "../interceptors";
import { Country } from "../../../types/api.types";

export class CountriesService {
  static async getAmericanCountries(): Promise<string[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AMERICAS}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.statusText}`);
      }

      const countries: Country[] = await handleApiResponse<Country[]>(response);
      return this.formatCountries(countries);
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
