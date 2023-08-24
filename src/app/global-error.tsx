"use client";
import React from "react";
import { ClientRoot } from "../layouts/root/client";
import { ErrorPage, ErrorPageProps } from "./error";

export default function GlobalErrorPage(props: ErrorPageProps) {
  return (
    <ClientRoot>
      <ErrorPage error={props.error} reset={props.reset} />
    </ClientRoot>
  );
}
