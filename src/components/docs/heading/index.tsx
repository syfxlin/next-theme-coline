import * as styles from "./styles.css";
import React, { isValidElement, JSX, ReactNode } from "react";

const visit = (node: any): string => {
  if (node.text) {
    return node.text;
  }
  if (node.children instanceof Array) {
    return node.children.map((item: any) => visit(item)).join("");
  }
  return "";
};

const parse = (node: ReactNode): string => {
  if (typeof node === "string") {
    return node;
  }
  if (typeof node === "number") {
    return String(node);
  }
  if (node instanceof Array) {
    return node.map((item) => parse(item)).join("");
  }
  if (isValidElement(node)) {
    if (node.props?.node) {
      return visit(node.props.node);
    } else {
      return parse(node.props.children);
    }
  }
  return "";
};

export type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
};

export const Heading: React.FC<HeadingProps> = (props) => {
  const id = parse(props.children);
  const Component: keyof JSX.IntrinsicElements = `h${props.level}`;
  return (
    <Component id={id} className={styles.container}>
      <a href={`#${encodeURIComponent(id)}`} aria-label={`${id} permalink`} />
      {props.children}
    </Component>
  );
};
