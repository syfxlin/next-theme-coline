import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const logo = styled.css`
  display: block;
  overflow: hidden;
  width: ${theme.fontSize.calc(2)};
  height: ${theme.fontSize.calc(2)};
  border-radius: ${theme.borderRadius.half};
`;

export const left = styled.css`
  display: flex;
  gap: ${theme.spacing.calc(1)};
  margin: ${theme.spacing.calc(4)};
`;

export const right = styled.css`
  display: flex;
  gap: ${theme.spacing.calc(1)};
  margin: ${theme.spacing.calc(4)};
`;
