// Shared Controller Types

/**
 * Standardized controller response type
 * All controller methods return this format for consistency
 */
export type ControllerResponse<T = any> = {
  /** Indicates if the operation was successful */
  success: boolean;
  /** The result data if successful */
  data?: T;
  /** Error message if the operation failed */
  error?: string;
};

/**
 * Progress tracking data
 */
export type ProgressData = {
  /** Whether the lesson was completed */
  completed?: boolean;
  /** Time spent on the lesson in seconds */
  timeSpent?: number;
  /** Score achieved (0-100) */
  score?: number;
};

/**
 * Pagination options
 */
export type PaginationOptions = {
  /** Page number (1-indexed) */
  page?: number;
  /** Number of items per page */
  limit?: number;
};

/**
 * Sort options
 */
export type SortOptions = {
  /** Field to sort by */
  field: string;
  /** Sort direction */
  order: "asc" | "desc";
};

/**
 * Generic query options
 */
export type QueryOptions = {
  pagination?: PaginationOptions;
  sort?: SortOptions;
  filter?: Record<string, any>;
};
