import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const logo = styled.css`
  display: flex;
  overflow: hidden;
  width: ${theme.fontSize.calc(2)};
  height: ${theme.fontSize.calc(2)};
  border-radius: ${theme.borderRadius.half};
`;

export const left = styled.css`
  display: flex;
  gap: ${theme.spacing.calc(1)};
  margin: 0 ${theme.spacing.calc(4)};
`;

export const right = styled.css`
  display: flex;
  gap: ${theme.spacing.calc(1)};
  margin: 0 ${theme.spacing.calc(4)};
`;

export const always = styled.css`
  display: inline-flex;

  > :nth-child(1) {
    display: inline;
  }

  > :nth-child(2) {
    display: none;
  }
`;

export const elastic = styled.css`
  display: inline-flex;

  > :nth-child(1) {
    display: inline;
  }

  > :nth-child(2) {
    display: none;
  }

  ${theme.media.md} {
    > :nth-child(1) {
      display: none;
    }

    > :nth-child(2) {
      display: inline;
    }
  }
`;

export const always_icon = styled.css`
  display: inline-flex;

  > :nth-child(1) {
    display: none;
  }

  > :nth-child(2) {
    display: inline;
  }
`;

export const elastic_icon = styled.css`
  display: inline-flex;

  > :nth-child(1) {
    display: none;
  }

  > :nth-child(2) {
    display: inline;
  }

  ${theme.media.md} {
    display: none;
  }
`;
