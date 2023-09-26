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

export const horizontal = styled.css`
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  gap: ${theme.spacing.calc(2)} ${theme.spacing.calc(3)};
`;

export const vertical = styled.css`
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  gap: ${theme.spacing.calc(2)} ${theme.spacing.calc(3)};
`;
