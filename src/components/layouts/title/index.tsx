import * as styles from "./styles.css";
import React, { ReactNode } from "react";

export type TitleProps = {
  title: ReactNode;
  children: ReactNode;
};

export const Title: React.FC<TitleProps> = (props) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{props.title}</h1>
      {props.children && <div className={styles.description}>{props.children}</div>}
    </section>
  );
};
