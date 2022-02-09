export interface KeyValueType {
  [key: string]: any;
}

export interface PaginationType<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
