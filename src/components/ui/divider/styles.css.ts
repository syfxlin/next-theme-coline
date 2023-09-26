import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  display: inline-block;
  width: ${theme.fontSize.calc(0.2)};
  height: ${theme.fontSize.calc(0.2)};
  border-radius: ${theme.borderRadius.calc("half")};
  background-color: ${theme.color.text.paragraph};
  margin: 0 ${theme.spacing.calc(2)};
  vertical-align: middle;
  text-align: center;
  opacity: 0.7;
`;
