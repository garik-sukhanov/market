import { useQuery } from "@tanstack/react-query";

import { productsService } from "../services";

export const PRODUCTS_QUERY_KEY = ["products"];

export const useProductsQuery = () => {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: () => productsService.getList(),
    select: (data) => data.data,
  });
};
