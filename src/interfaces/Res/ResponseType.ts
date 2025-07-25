export interface ResponseI<T> {
  success: boolean;
  message: string;
  data: T;
  status: number;
}

export interface ErrorResI {
  success: boolean;
  message: string;
  error: string;
  status: number;
}
