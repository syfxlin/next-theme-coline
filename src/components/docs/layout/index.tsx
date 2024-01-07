import * as styles from "./styles.css";
import React, { ReactElement } from "react";

export type LayoutProps = {
  layout: [number, ...number[]];
  children: ReactElement[];
};

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className={styles.container} style={{ gridTemplateColumns: props.layout.map((i) => `${i}fr`).join(" ") }}>
      {props.children.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};
