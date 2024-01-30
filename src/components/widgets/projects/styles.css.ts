import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const heading = styled.css`
  position: relative;
  text-align: center;
  color: ${theme.color.text.paragraph};
  font-size: ${theme.fontSize.calc(1.2)};
  font-weight: ${theme.fontWeight.semibold};
  margin-top: ${theme.spacing.calc(10)};
  margin-bottom: ${theme.spacing.calc(3)};
  padding-bottom: ${theme.spacing.calc(1)};

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: ${theme.borderWidth.calc(-1)};
    display: block;
    height: ${theme.borderWidth.calc(2.5)};
    width: ${theme.fontSize.calc(2)};
    background: linear-gradient(${theme.color.text.primary} 30%, ${theme.color.text.primary} 70%);
    box-shadow: ${theme.color.text.primary} 0 ${theme.borderWidth.calc(1)} ${theme.borderWidth.calc(3)};
    border-radius: ${theme.borderWidth.calc(4)};
    transition: all 0.25s ease 0s, color 0.3s, background-color 0.3s;
    z-index: 1;
  }
`;

export const link = styled.css`
  display: flex !important;
  text-align: start !important;
  gap: ${theme.spacing.calc(2)} !important;
  padding: ${theme.spacing.calc(4)} !important;
  border-bottom: none !important;
`;

export const left = styled.css`
  flex: 1;
  display: block;
  overflow: hidden;
`;

export const name = styled.css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.calc(2)};
  overflow: hidden;
  line-height: ${theme.lineHeight.default};
  font-size: ${theme.fontSize.calc(1)};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.color.text.paragraph};

  span:nth-child(1) {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const text = styled.css`
  display: block;
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: ${theme.lineHeight.default};
  font-size: ${theme.fontSize.calc(0.8)};
  color: ${theme.color.text.paragraph};

  @supports (-webkit-line-clamp: 2) {
    display: -webkit-box;
    text-overflow: ellipsis;
    white-space: initial;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export const component = styled.css`
  color: ${theme.color.text.description} !important;
  width: ${theme.fontSize.calc(0.9)} !important;
  height: ${theme.fontSize.calc(0.9)} !important;
`;

export const right = styled.css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.calc(0.5)};
`;

export const icon = styled.css`
  color: ${theme.color.text.description} !important;
  width: ${theme.fontSize.calc(1.4)} !important;
  height: ${theme.fontSize.calc(1.4)} !important;
`;

export const github = styled.css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.calc(0.5)};
  color: ${theme.color.text.description};
  font-size: ${theme.fontSize.calc(0.5)};
  line-height: ${theme.lineHeight.none};
  min-width: calc(4ch + ${theme.fontSize.calc(1.4)});
  white-space: nowrap;

  svg {
    width: ${theme.fontSize.calc(0.9)} !important;
    height: ${theme.fontSize.calc(0.9)} !important;
  }
`;
