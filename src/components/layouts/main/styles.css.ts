import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  flex: 1;
  position: relative;
  margin: 0 auto;
  max-width: ${theme.fontSize.calc(45)};
  padding: 0 ${theme.spacing.calc(8)};
`;
