import { useSession } from "@/shared/model/session";

import { Button, type ButtonProps } from "../ui";

export const LogoutButton = (props: ButtonProps) => {
  const { logout } = useSession();
  return (
    <Button $variant="ghost" {...props} onClick={logout}>
      Выход
    </Button>
  );
};
