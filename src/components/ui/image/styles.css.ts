import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  transition: filter 0.3s;
  overflow: hidden;
  filter: ${theme.color.image.filter};
`;

export const placeholder = styled.css`
  position: relative;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const image = styled.css`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
