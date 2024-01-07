import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  display: grid;
  gap: ${theme.spacing.calc(2)};
  margin-top: ${theme.spacing.calc(4)};
  margin-bottom: ${theme.spacing.calc(4)};

  & > div > * {
    margin-top: 0;
    margin-bottom: 0;
  }
`;
