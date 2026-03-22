import { Modal } from "@/shared/components/ui";

import { CreateProductForm } from "../create-product-form";

export type CreateProductModalProps = {
  open?: boolean;
  onCancel?: () => void;
  onCreated?: () => void;
};

export const CreateProductModal = ({
  open,
  onCancel,
  onCreated,
}: CreateProductModalProps) => {
  return (
    <Modal open={open} onCancel={onCancel} title="Добавить товар" footer={null}>
      <CreateProductForm
        onCancel={onCancel}
        onSuccess={() => {
          onCreated?.();
          onCancel?.();
        }}
      />
    </Modal>
  );
};
