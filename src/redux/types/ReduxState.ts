export interface GenericState<T> {
  items: T[];
  visibleItems: T[];
  loading: boolean;
  error: string | null;
}