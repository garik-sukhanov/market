import { instance } from "../api/instance";
import type { GetProductsResponseDto } from "../types/dto";

class ProductService {
  private _NOTES = "/products";

  getList(params?: { page?: number; size?: number }) {
    return instance.get<GetProductsResponseDto>(this._NOTES, { params });
  }
}

export const productService = new ProductService();
