"use client";
import React from "react";
import dynamic from "next/dynamic";
import "@staticcms/core/dist/main.css";

const CMS = dynamic(
  async () => {
    const m = await import("../../plugins/staticcms");
    m.makeStaticCms(m.withStaticCms());
    return { default: () => null };
  },
  {
    ssr: false,
  },
);

const Admin: React.FC = () => {
  return <CMS />;
};

export default Admin;
