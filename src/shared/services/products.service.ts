import { instance } from "../api/instance";
import type {
  CreateProductDto,
  GetProductsResponseDto,
  ReqListQueryParams,
  ReqSearchQueryParams,
} from "../types/requests";

class ProductsService {
  private _PRODUCTS = "/products";

  getList(params?: ReqListQueryParams) {
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

export const productsService = new ProductsService();
