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

type TokenStorage = "local" | "session";

let refreshTokenPromise: Promise<string | null> | null = null;

const getStoredToken = () =>
  localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);

const getStoredTokenStorage = (): TokenStorage | null => {
  if (localStorage.getItem(TOKEN_KEY)) return "local";
  if (sessionStorage.getItem(TOKEN_KEY)) return "session";
  return null;
};

export const useSession = createGStore(() => {
  const [token, setToken] = useState(() => getStoredToken());
  const [tokenStorage, setTokenStorage] = useState<TokenStorage | null>(() =>
    getStoredTokenStorage(),
  );

  const setStoredToken = (nextToken: string, storage: TokenStorage) => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);

    if (storage === "local") {
      localStorage.setItem(TOKEN_KEY, nextToken);
    } else {
      sessionStorage.setItem(TOKEN_KEY, nextToken);
    }

    setToken(nextToken);
    setTokenStorage(storage);
  };

  const login = (token: string, rememberMe: boolean) => {
    setStoredToken(token, rememberMe ? "local" : "session");
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setTokenStorage(null);
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
              const storage =
                tokenStorage ?? getStoredTokenStorage() ?? "local";
              setStoredToken(newToken, storage);
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
