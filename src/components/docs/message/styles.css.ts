import { cx, styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const base = styled.css`
  font-size: ${theme.fontSize.calc(0.9)};
  padding: ${theme.spacing.calc(5)} ${theme.spacing.calc(6)};
  margin-top: ${theme.spacing.calc(4)};
  margin-bottom: ${theme.spacing.calc(4)};
`;

export const info = cx(
  base,
  styled.css`
    color: ${theme.color.info.text};
    background-color: ${theme.color.info.background};
  `,
);

export const warn = cx(
  base,
  styled.css`
    color: ${theme.color.warn.text};
    background-color: ${theme.color.warn.background};
  `,
);

export const success = cx(
  base,
  styled.css`
    color: ${theme.color.success.text};
    background-color: ${theme.color.success.background};
  `,
);

export const error = cx(
  base,
  styled.css`
    color: ${theme.color.error.text};
    background-color: ${theme.color.error.background};
  `,
);
