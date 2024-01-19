"use client";
import React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { COLINE_GOOGLE_ANALYTICS } from "../../../env/public";

export const Analytics: React.FC = () => {
  return <>{COLINE_GOOGLE_ANALYTICS && <GoogleAnalytics trackPageViews gaMeasurementId={COLINE_GOOGLE_ANALYTICS} />}</>;
};
