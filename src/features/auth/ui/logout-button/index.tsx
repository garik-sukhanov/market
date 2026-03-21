import { Button, type ButtonProps } from "@/shared/components/ui";
import { useSession } from "@/shared/model/session";

export const LogoutButton = (props: ButtonProps) => {
  const { logout } = useSession();
  return (
    <Button $variant="ghost" {...props} onClick={logout}>
      Выход
    </Button>
  );
};
