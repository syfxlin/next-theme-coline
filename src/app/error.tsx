"use client";
import React, { useMemo } from "react";
import { ErrorFound } from "../components/layouts/error-found";
import { Link } from "../components/ui/link";
import { t } from "../locales";

export type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage(props: ErrorPageProps) {
  // prettier-ignore
  const url = useMemo(() => {
    const w = typeof window !== "undefined" ? window : {} as any;
    const url = new URL("https://github.com/syfxlin/blog/issues/new");
    url.searchParams.set("title", `Uncaught exception on page: ${w?.location?.toString()}`);
    url.searchParams.set("labels", "bug");
    let body = "";
    body += `- **URL**: ${w?.location?.toString()}\n`;
    body += `- **UA**: ${w?.navigator?.userAgent}\n`;
    body += `\n`;
    body += `\`\`\`javascript`;
    body += `\n`;
    body += props.error.message;
    body += `\n`;
    body += props.error.stack;
    body += `\n`;
    body += `\`\`\``;
    url.searchParams.set("body", body);
    return url.toString();
  }, [props.error]);

  return (
    <ErrorFound code={500} message="Internal Error">
      {t("error.before")}&nbsp;
      <Link href={url} aria-label="create syfxlin/blog issues" target="_blank" rel="nofollow noopener noreferrer">
        {t("error.link")}
      </Link>
      &nbsp;{t("error.after")}
    </ErrorFound>
  );
}

export { ErrorPage };
