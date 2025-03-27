import { useState, useEffect } from "react";
import { CountriesService } from "../../services/api/endpoints/countriesService";
import { UseCountriesReturn } from "../../types/hooks.types";

export function useCountries(): UseCountriesReturn {
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCountries = async () => {
      try {
        setLoading(true);
        const americanCountries = await CountriesService.getAmericanCountries();

        if (mounted) {
          setCountries(americanCountries);
          setError(null);
        }
      } catch (error) {
        if (mounted) {
          console.error("Error fetching countries:", error);
          setError(
            error instanceof Error
              ? error.message
              : "Error al cargar la lista de países"
          );
          setCountries([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCountries();

    return () => {
      mounted = false;
    };
  }, []);

  return { countries, loading, error };
}
