export interface UseCountriesReturn {
  countries: string[];
  loading: boolean;
  error: string | null;
}

export interface CheckoutFormData {
  email: string;
  name: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface FormErrors {
  [key: string]: string;
}
