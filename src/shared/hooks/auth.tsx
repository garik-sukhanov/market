import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useNotification } from "@/shared/context";
import { useSession } from "@/shared/model/session";
import { authService } from "@/shared/services";
import type { LoginDto } from "@/shared/types/requests";

type LoginVariables = LoginDto & { rememberMe: boolean };

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { login } = useSession();
  const { success, error: notifyError } = useNotification();

  return useMutation({
    mutationFn: (variables: LoginVariables) =>
      authService.login({
        username: variables.username,
        password: variables.password,
        expiresInMins: variables.expiresInMins,
      }),
    onSuccess: (data, variables) => {
      success("Успешная авторизация");
      login(data.data.accessToken, variables.rememberMe);
      navigate("/");
    },

    onError: (err) => {
      if (axios.isAxiosError(err)) {
        notifyError("Ошибка авторизации");
        console.log(
          "ошибка авторизации",
          err.response?.status,
          err.response?.data,
        );
        return;
      }
    },
  });
};
