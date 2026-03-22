import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useNotification } from "@/shared/context";

import { productsService } from "../services";
import type {
  CreateProductDto,
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

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();
  const { success, error: notifyError } = useNotification();

  return useMutation({
    mutationFn: (dto: CreateProductDto) => productsService.add(dto),
    onSuccess: async () => {
      success("Товар создан");
      await queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        notifyError("Не удалось создать товар");
        return;
      }
      notifyError("Не удалось создать товар");
    },
  });
};
