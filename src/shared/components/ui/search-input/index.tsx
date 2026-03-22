import styled from "styled-components";

import { IconSearch, IconX } from "@/shared/assets";
import { lightTokens } from "@/shared/tokens";

import { Input, type StyledInputProps } from "../input";

export type SearchInputProps = StyledInputProps & {
  onClickClear?: () => void;
  clearAriaLabel?: string;
};

const ClearButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SearchInput = ({
  style,
  value,
  onClickClear,
  clearAriaLabel = "Очистить поиск",
  $suffix,
  $suffixInteractive,
  ...props
}: SearchInputProps) => {
  const hasValue =
    value != null && (Array.isArray(value) ? value.length > 0 : `${value}` !== "");
  const shouldShowClear = Boolean(onClickClear) && hasValue && !$suffix;

  return (
    <Input
      $prefix={<IconSearch aria-hidden="true" />}
      $suffix={
        shouldShowClear ? (
          <ClearButton
            type="button"
            aria-label={clearAriaLabel}
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClickClear}
          >
            <IconX aria-hidden="true" color={lightTokens.colors.grey3} />
          </ClearButton>
        ) : (
          $suffix
        )
      }
      $suffixInteractive={shouldShowClear ? true : $suffixInteractive}
      style={{
        ...style,
        borderRadius: 8,
        borderColor: "#F3F3F3",
        flex: 1,
        padding: "12px 20px 12px 52px",
      }}
      $wrapperProps={{
        style: {
          maxWidth: 1023,
        },
      }}
      $fullWidth
      value={value}
      {...props}
    />
  );
};
