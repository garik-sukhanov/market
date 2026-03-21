import { IconSearch } from "@/shared/assets";

import { Input, type StyledInputProps } from "../ui";

export const SearchInput = ({ style, ...props }: StyledInputProps) => (
  <Input
    $prefix={<IconSearch aria-hidden="true" />}
    style={{
      ...style,
      borderRadius: 8,
      borderColor: "#F3F3F3",
      flex: 1,
      padding: "12px 20px 12px 52px",
    }}
    {...props}
  />
);
