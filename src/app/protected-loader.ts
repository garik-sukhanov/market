import { redirect } from "react-router";

import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";

export async function protectedLoader() {
  const token = await useSession.getState().refreshToken();

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}
