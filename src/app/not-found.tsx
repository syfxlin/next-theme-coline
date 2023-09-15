import React from "react";
import { Root } from "../components/layouts/root";
import { ErrorFound } from "../components/layouts/error-found";

export default function NotFoundPage() {
  return (
    <Root>
      <ErrorFound code={404} message="Not Found" />
    </Root>
  );
}
