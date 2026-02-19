/**
 * COOKHUB Configuration Utility
 * Handles environment-specific values like Base URLs
 */

export const getBaseUrl = () => {
  // If we are in the browser, use a relative path
  if (typeof window !== "undefined") {
    return "";
  }

  // If we are on Vercel, use the Vercel URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback to the environment variable or localhost
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
};

export const SITE_URL = getBaseUrl();
