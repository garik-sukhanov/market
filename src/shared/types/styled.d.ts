import { ThemeTokens } from "@/shared/tokens";

import "styled-components";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ThemeTokens {}
}
