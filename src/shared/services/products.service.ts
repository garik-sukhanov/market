import { instance } from "../api/instance";
import type { CreateProductDto, GetProductsResponseDto } from "../types/dto";

type SelectParamsType = "title" | "price";
type OrderParamsType = "asc" | "desc";
type ProductListParams = {
  limit?: number;
  skip?: number;
  select?: SelectParamsType;
  sortBy?: SelectParamsType;
  order?: OrderParamsType;
};

type SearchParamsType = ProductListParams & {
  q: string;
};
class ProductService {
  private _PRODUCTS = "/products";

  getList(params?: ProductListParams) {
    return instance.get<GetProductsResponseDto>(this._PRODUCTS, { params });
  }

  search(params?: SearchParamsType) {
    return instance.get<GetProductsResponseDto>(`${this._PRODUCTS}/search`, {
      params,
    });
  }

  add(dto: CreateProductDto) {
    return instance.post(`${this._PRODUCTS}/add`, dto);
  }
}

export const productService = new ProductService();
