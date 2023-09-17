import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing.calc(2)};
  margin: 0 ${theme.fontSize.calc(-15)};

  @media screen and (max-width: ${theme.fontSize.calc(75)}) {
    margin: 0;
  }

  > * {
    width: calc((100% - ${theme.spacing.calc(4)}) / 3);

    @media screen and (max-width: ${theme.fontSize.calc(75)}) {
      width: calc((100% - ${theme.spacing.calc(2)}) / 2);
    }

    @media screen and (max-width: ${theme.fontSize.calc(45)}) {
      width: 100%;
    }
  }
`;
