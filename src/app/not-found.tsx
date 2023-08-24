import React from "react";
import { Root } from "../layouts/root";
import { ErrorFound } from "../components/layout/error-found";

export default function NotFoundPage() {
  return (
    <Root>
      <ErrorFound code={404} message="Not Found" />
    </Root>
  );
}
