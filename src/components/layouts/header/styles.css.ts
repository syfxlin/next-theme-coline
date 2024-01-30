import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  z-index: 5;
  width: 100px;
  height: 100%;
  max-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  transition: transform 0.3s, color 0.3s, background-color 0.3s;

  ${theme.media.md} {
    transform: translateX(-100px);
  }
`;

export const icon = styled.css`
  display: flex !important;
  overflow: hidden !important;
  writing-mode: horizontal-tb;
  width: ${theme.fontSize.calc(2)} !important;
  height: ${theme.fontSize.calc(2)} !important;
  border-radius: ${theme.borderRadius.half} !important;
`;

export const left = styled.css`
  display: flex !important;
  gap: ${theme.spacing.calc(1)} !important;
  margin: ${theme.spacing.calc(1)} 0 ${theme.spacing.calc(2)} !important;
`;

export const right = styled.css`
  display: flex !important;
  gap: ${theme.spacing.calc(1)} !important;
  margin: ${theme.spacing.calc(1)} 0 !important;
  writing-mode: vertical-lr;

  a {
    padding: ${theme.spacing.calc(2.5)} ${theme.spacing.calc(2)};

    span span {
      display: inline-block;
      letter-spacing: -0.3em;
    }

    span span:first-child {
      transform: translateY(-0.3em);
    }
  }
`;

export const menu = styled.css`
  transition: transform 0.3s, color 0.3s, background-color 0.3s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-100px);

  ${theme.media.md} {
    transform: translateX(0);
  }
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

  ${theme.media.hmd} {
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

  ${theme.media.hmd} {
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

  ${theme.media.hmd} {
    display: none !important;
  }
`;
