"use client";

export function HelloWorld() {
  return (
    <script
      id="hello-world-script"
      dangerouslySetInnerHTML={{
        __html: `
          const e1 = "line-height:22px;border-radius:3px;color:#FFF;background:#7048e8;";
          const e2 = "line-height:22px;border-radius:3px;";
          console.info("%c \u9752\u7A7A\u4E4B\u84DD %c", e1, "", "https://ixk.me");
          console.info("%c Next.js Template %c", e1, "", "https://github.com/syfxlin/blog");
          console.info("%c \u26F5 \u53D1\u73B0\u63A7\u5236\u53F0\u62A5\u9519\u8BF7\u52A1\u5FC5\u8054\u7CFB\u535A\u4E3B \u26F5", e2);
        `,
      }}
    />
  );
}
