import React, { createContext, useCallback, useContext, useState } from "react";
import styled, { keyframes } from "styled-components";

type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Toast = styled.div<{ $type: NotificationType }>`
  min-width: 250px;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.bgContainer};
  color: ${({ theme }) => theme.colors.textBase};
  box-shadow: ${({ theme }) => theme.shadows.primary};
  border: 2px solid
    ${({ $type, theme }) => {
      switch ($type) {
        case "success":
          return "#52c41a";
        case "error":
          return "#ff4d4f";
        case "warning":
          return "#faad14";
        default:
          return theme.colors.primary;
      }
    }};
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, type: NotificationType = "info") => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeNotification(id), 3000);
    },
    [removeNotification],
  );

  const success = useCallback(
    (message: string) => notify(message, "success"),
    [notify],
  );
  const error = useCallback(
    (message: string) => notify(message, "error"),
    [notify],
  );

  return (
    <NotificationContext.Provider value={{ notify, success, error }}>
      {children}
      <Container>
        {notifications.map((n) => (
          <Toast key={n.id} $type={n.type}>
            {n.message}
          </Toast>
        ))}
      </Container>
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
