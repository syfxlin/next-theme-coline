"use client";

export const HelloWorld = () => {
  return (
    <script
      id="hello-world-script"
      dangerouslySetInnerHTML={{
        __html: `
          const e1 = "line-height:22px;border-radius:3px;color:#FFF;background:#7048e8;";
          const e2 = "line-height:22px;border-radius:3px;";
          console.info("%c \u9752\u7a7a\u4e4b\u84dd %c", e1, "", "https://ixk.me");
          console.info("%c Next.js Template %c", e1, "", "https://github.com/syfxlin/blog");
          console.info("%c \u26f5 \u53d1\u73b0\u63a7\u5236\u53f0\u62a5\u9519\u8bf7\u52a1\u5fc5\u8054\u7cfb\u535a\u4e3b \u26f5", e2);
        `,
      }}
    />
  );
};
