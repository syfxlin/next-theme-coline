import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  margin-left: ${theme.fontSize.calc(-14)};
  width: ${theme.fontSize.calc(12)};
  max-height: ${theme.fontSize.calc(30)};
  padding: ${theme.spacing.calc(1)};
  overflow-y: auto;

  @media (max-width: ${theme.fontSize.calc(75)}) {
    display: none;
  }

  > ul {
    margin: 0;
    padding: 0;
  }
`;

export const list = styled.css`
  gap: ${theme.spacing.calc(1)};
  padding-left: ${theme.fontSize.calc(1)};
  display: flex;
  list-style: none;
  flex-direction: column;
`;

export const item = styled.css`
  display: flex;
  flex-direction: column;

  a {
    flex-grow: 1;
    text-align: left;
    justify-content: flex-start;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    display: inline-block;
  }
`;
