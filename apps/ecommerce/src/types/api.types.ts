export interface Country {
  name: {
    common: string;
    official: string;
  };
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
