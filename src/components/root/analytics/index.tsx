"use client";
import React from "react";
import { COLINE_GOOGLE_ANALYTICS } from "../../../env/public.mjs";
import { GoogleAnalytics } from "nextjs-google-analytics";

export const Analytics: React.FC = () => {
  return <>{COLINE_GOOGLE_ANALYTICS && <GoogleAnalytics trackPageViews gaMeasurementId={COLINE_GOOGLE_ANALYTICS} />}</>;
};
