import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  width: 80%;
  border: 0;
  height: ${theme.borderWidth.calc(2)};
  background-image: linear-gradient(
    to right,
    ${theme.color.background.hover},
    ${theme.color.background.focus},
    ${theme.color.background.hover}
  );
`;
