import type { AxiosResponse } from "axios";

import { instance } from "@/shared/api/instance";
import type { LoginDto, LoginResponseDto } from "@/shared/types/requests";

class AuthService {
  private _AUTH: string = "/auth";

  public login(dto: LoginDto): Promise<AxiosResponse<LoginResponseDto>> {
    return instance.post(`${this._AUTH}/login`, dto, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const authService = new AuthService();
