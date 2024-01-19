import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const logo = styled.css`
  display: flex !important;
  overflow: hidden !important;
  width: ${theme.fontSize.calc(2)} !important;
  height: ${theme.fontSize.calc(2)} !important;
  border-radius: ${theme.borderRadius.half} !important;
`;

export const left = styled.css`
  display: flex !important;
  gap: ${theme.spacing.calc(1)} !important;
  margin: 0 ${theme.spacing.calc(4)} !important;
`;

export const right = styled.css`
  display: flex;
  gap: ${theme.spacing.calc(1)};
  margin: 0 ${theme.spacing.calc(4)};
`;

export const view_text = styled.css`
  display: inline-flex !important;

  > :nth-child(1) {
    display: inline !important;
  }

  > :nth-child(2) {
    display: none !important;
  }
`;

export const view_icon = styled.css`
  display: inline-flex !important;

  > :nth-child(1) {
    display: none !important;
  }

  > :nth-child(2) {
    display: inline !important;
  }
`;

export const view_elastic = styled.css`
  display: inline-flex !important;

  > :nth-child(1) {
    display: inline !important;
  }

  > :nth-child(2) {
    display: none !important;
  }

  ${theme.media.md} {
    > :nth-child(1) {
      display: none !important;
    }

    > :nth-child(2) {
      display: inline !important;
    }
  }
`;

export const view_elastic_text = styled.css`
  display: inline-flex !important;

  > :nth-child(1) {
    display: inline !important;
  }

  > :nth-child(2) {
    display: none !important;
  }

  ${theme.media.md} {
    display: none !important;
  }
`;

export const view_elastic_icon = styled.css`
  display: inline-flex !important;

  > :nth-child(1) {
    display: none !important;
  }

  > :nth-child(2) {
    display: inline !important;
  }

  ${theme.media.md} {
    display: none !important;
  }
`;
