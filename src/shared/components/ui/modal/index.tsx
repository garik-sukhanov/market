import { type ComponentProps, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { Button } from "../button";
import { Flex } from "../flex";
import { Typography } from "../typography";

export interface ModalProps extends ComponentProps<"div"> {
  open?: boolean;
  onCancel?: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[48]};
  box-shadow: ${({ theme }) => theme.shadows.primary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};
  width: min(527px, 100%);
  max-width: none;
  border: none;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Content = styled.div`
  flex: 1;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ModalHeader = styled(Flex)`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Modal = ({ open, onCancel, title, children, footer }: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <Overlay onClick={onCancel}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader $justify="space-between" $align="center">
          <Typography $variant="h3">{title}</Typography>
          <Button $variant="ghost" $size="small" onClick={onCancel}>
            ✕
          </Button>
        </ModalHeader>
        <Content>{children}</Content>
        {footer !== null && (
          <Flex $justify="flex-end" $gap={2}>
            {footer || (
              <Button $variant="secondary" onClick={onCancel}>
                Закрыть
              </Button>
            )}
          </Flex>
        )}
      </ModalContainer>
    </Overlay>,
    document.body,
  );
};

export { Modal };
