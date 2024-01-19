import React, { ReactNode } from "react";
import { Link } from "../../ui/link";
import { t } from "../../../locales";
import * as styles from "./styles.css";

export interface ErrorFoundProps {
  code: number;
  message: string;
  children?: ReactNode;
}

export const ErrorFound: React.FC<ErrorFoundProps> = (props) => {
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <div className={styles.title}>{props.code}</div>
        <div className={styles.title}>{props.message}</div>
      </section>
      {props.children && <section className={styles.content}>{props.children}</section>}
      <section>
        <Link href="/" aria-label={t("error.back")}>
          {t("error.back")}
        </Link>
      </section>
    </main>
  );
};
