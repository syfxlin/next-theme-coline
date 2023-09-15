import * as styles from "./styles.css";
import React, { ReactNode } from "react";
import { Link } from "../../ui/link";

export type ErrorFoundProps = {
  code: number;
  message: string;
  children?: ReactNode;
};

export const ErrorFound: React.FC<ErrorFoundProps> = (props) => {
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <div className={styles.title}>{props.code}</div>
        <div className={styles.title}>{props.message}</div>
      </section>
      {props.children && <section className={styles.content}>{props.children}</section>}
      <section>
        <Link href="/" aria-label="返回首页">
          返回首页
        </Link>
      </section>
    </main>
  );
};
