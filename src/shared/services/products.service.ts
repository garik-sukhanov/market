import { instance } from "../api/instance";
import type {
  CreateProductDto,
  GetProductsResponseDto,
  ReqListListQueryParams,
  ReqSearchQueryParams,
} from "../types/requests";

class ProductService {
  private _PRODUCTS = "/products";

  getList(params?: ReqListListQueryParams) {
    return instance.get<GetProductsResponseDto>(this._PRODUCTS, { params });
  }

  search(params?: ReqSearchQueryParams) {
    return instance.get<GetProductsResponseDto>(`${this._PRODUCTS}/search`, {
      params,
    });
  }

  add(dto: CreateProductDto) {
    return instance.post(`${this._PRODUCTS}/add`, dto);
  }
}

export const productService = new ProductService();
