import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  font-size: ${theme.fontSize.calc(0.8)};
  font-weight: ${theme.fontWeight.default};
  line-height: ${theme.lineHeight.default};
  color: ${theme.color.text.x3};
  margin: 0;
  position: relative;
`;

export const link = styled.css`
  position: relative;
  z-index: 1;
`;
