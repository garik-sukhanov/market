import { type ReactElement, useState } from "react";

export type TriggerProps = {
  children: ReactElement;
  modal: ReactElement<{
    open?: boolean;
    onCancel?: () => void;
  }>;
};

export const Trigger = ({ children, modal }: TriggerProps) => {
  const [isActive, setActive] = useState(false);

  const toggleActive = () => {
    setActive((prev) => !prev);
  };

  return (
    <>
      <children.type onClick={toggleActive} {...(children.props as object)} />
      {isActive ? (
        <modal.type
          {...modal.props}
          open={isActive}
          onCancel={() => {
            setActive(false);
          }}
        />
      ) : null}
    </>
  );
};
