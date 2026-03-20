import type { AxiosResponse } from "axios";

import { instance } from "@/shared/api/instance";
import type { LoginDto, LoginResponseDto } from "@/shared/types/dto";

class AuthService {
  private _AUTH: string = "/auth";

  public login(dto: LoginDto): Promise<AxiosResponse<LoginResponseDto>> {
    return instance.post(`${this._AUTH}/login`, dto);
  }
}

export const authService = new AuthService();
