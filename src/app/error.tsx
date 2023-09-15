"use client";
import React, { useMemo } from "react";
import { ErrorFound } from "../components/layouts/error-found";
import { Link } from "../components/ui/link";

export type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage(props: ErrorPageProps) {
  // prettier-ignore
  const url = useMemo(() => {
    const w = typeof window !== "undefined" ? window : {} as any;
    const url = new URL("https://github.com/syfxlin/gatsby-theme-coline/issues/new");
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
      页面出现了一些问题。如果您有空闲时间，麻烦您点击该&nbsp;
      <Link
        href={url}
        aria-label="create syfxlin/gatsby-theme-coline issues"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        链接
      </Link>
      &nbsp;创建一个 GitHub Issue ，非常感谢。
    </ErrorFound>
  );
}

export { ErrorPage };
