import { useState } from "react";
import { createGStore } from "create-gstore";
import { jwtDecode } from "jwt-decode";

import { instance } from "../api/instance";
import { TOKEN_KEY } from "../constants";

type Session = {
  id: string;
  email: string;
  expiresInMins: number;
};

let refreshTokenPromise: Promise<string | null> | null = null;

export const useSession = createGStore(() => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const session = token ? jwtDecode<Session>(token) : null;

  const refreshToken = async () => {
    if (!token) {
      return null;
    }

    const session = jwtDecode<Session>(token);

    if (session.expiresInMins < Date.now() / 1000) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = instance
          .post("/auth/refresh")
          .then((r) => r.data?.accessToken ?? null)
          .then((newToken) => {
            if (newToken) {
              login(newToken);
              return newToken;
            } else {
              logout();
              return null;
            }
          })
          .catch(() => {
            logout();
            return null;
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      const newToken = await refreshTokenPromise;

      if (newToken) {
        return newToken;
      } else {
        return null;
      }
    }

    return token;
  };

  return { refreshToken, login, logout, session };
});
