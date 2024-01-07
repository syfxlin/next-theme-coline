import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  padding-inline-start: ${theme.fontSize.calc(2)};

  li {
    margin: ${theme.spacing.calc(2)} 0;
  }

  p:last-of-type {
    margin-top: 0;
    margin-bottom: 0;
  }
`;
