import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const link = styled.css`
  display: flex;
  text-align: left;
  gap: ${theme.spacing.calc(2)};
  padding: ${theme.spacing.calc(4)};
  border-bottom: none;
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
  color: ${theme.color.text.description};
  width: ${theme.fontSize.calc(0.9)};
  height: ${theme.fontSize.calc(0.9)};
`;

export const right = styled.css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.calc(0.5)};
`;

export const icon = styled.css`
  color: ${theme.color.text.description};
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
    margin-top: ${theme.fontSize.calc(0.1)};
    width: ${theme.fontSize.calc(0.9)};
    height: ${theme.fontSize.calc(0.9)};
  }
`;
