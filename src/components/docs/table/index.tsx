import * as styles from "./styles.css";
import React, { ReactNode } from "react";

export type TableProps = {
  head?: Array<{
    children: ReactNode;
    colSpan?: number;
    rowSpan?: number;
  }>;
  body: Array<
    Array<{
      children: ReactNode;
      colSpan?: number;
      rowSpan?: number;
    }>
  >;
};

export const Table: React.FC<TableProps> = ({ head, body }) => {
  return (
    <table className={styles.container}>
      {head && (
        <thead>
          <tr>
            {head.map((x, i) => (
              <th key={i} colSpan={x.colSpan} rowSpan={x.rowSpan}>
                {x.children}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {body.map((row, i) => (
          <tr key={i}>
            {row.map((x, j) => (
              <td key={j} colSpan={x.colSpan} rowSpan={x.rowSpan}>
                {x.children}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
