import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  width: 100%;
  border-collapse: collapse;
  caption-side: top;

  th,
  td {
    padding: ${theme.spacing.calc(2)} ${theme.spacing.calc(3)};
  }

  tr {
    border-top: ${theme.borderWidth.default} ${theme.borderStyle.default} ${theme.color.text.x3};
    border-bottom: ${theme.borderWidth.default} ${theme.borderStyle.default} ${theme.color.text.x3};
  }

  thead {
    background-color: ${theme.color.primary.hover};
  }
`;
