import type { ProductType } from ".";

export type SelectParamsType = "title" | "price";
export type OrderParamsType = "asc" | "desc";
export type ReqListQueryParams = {
  limit?: number;
  skip?: number;
  select?: SelectParamsType;
  sortBy?: SelectParamsType;
  order?: OrderParamsType;
};

export type ReqSearchQueryParams = ReqListQueryParams & {
  q: string;
};

// AUTH
export type LoginDto = {
  username: string;
  password: string;
  expiresInMins?: number; // optional, defaults to 60
};

export type LoginResponseDto = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type GetProductsResponseDto = {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
};

export type CreateProductDto = Partial<ProductType>;
