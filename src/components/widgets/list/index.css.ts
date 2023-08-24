import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.calc(4)} ${theme.spacing.calc(6)};
  flex-wrap: wrap;
`;
