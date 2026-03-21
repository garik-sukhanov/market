import { useQuery } from "@tanstack/react-query";

import { productsService } from "../services";
import type {
  ReqListQueryParams,
  ReqSearchQueryParams,
} from "../types/requests";

export const PRODUCTS_QUERY_KEY = ["products"];

export const useProductsQuery = (params: ReqListQueryParams) => {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, params],
    queryFn: () => productsService.getList(params),
    select: (data) => data.data,
  });
};

export const useProductsSearchQuery = (params: ReqSearchQueryParams) => {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, params],
    queryFn: () => productsService.search(params),
    select: (data) => data.data,
  });
};
