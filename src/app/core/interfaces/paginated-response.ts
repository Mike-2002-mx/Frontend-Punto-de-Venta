export interface PaginatedResponse<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
}