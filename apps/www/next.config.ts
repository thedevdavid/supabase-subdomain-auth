import { COOKIE_NAME } from "@repo/supabase/utils/cookies";
import { NextConfig } from "next";

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

console.log("Environment variables:", {
  APP_URL: process.env.APP_URL,
  DOCS_DOMAIN: process.env.DOCS_DOMAIN,
  DOCS_URL: process.env.DOCS_URL,
  SITE_DOMAIN: process.env.SITE_DOMAIN,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  transpilePackages: ["@repo/supabase"],
  redirects: async () => {
    const APP_URL = getEnvVariable("APP_URL");
    const DOCS_URL = getEnvVariable("DOCS_URL");

    return [
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: COOKIE_NAME,
          },
        ],
        destination: `${APP_URL}/app`,
        permanent: false,
      },
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: `${COOKIE_NAME}-code-verifier`,
          },
        ],
        destination: `${APP_URL}/app`,
        permanent: false,
      },
      {
        source: "/docs/:path*",
        destination: `${DOCS_URL}/:path*`,
        permanent: false,
      },
    ];
  },
  rewrites: async () => {
    const APP_URL = getEnvVariable("APP_URL");
    const DOCS_DOMAIN = getEnvVariable("DOCS_DOMAIN");
    const DOCS_URL = getEnvVariable("DOCS_URL");
    const SITE_DOMAIN = getEnvVariable("SITE_DOMAIN");

    console.log("Environment variables inside rewrites:", {
      APP_URL,
      DOCS_DOMAIN,
      DOCS_URL,
      SITE_DOMAIN,
    });
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/app",
        destination: `${APP_URL}/app`,
      },
      {
        source: "/app/:path+",
        destination: `${APP_URL}/app/:path+`,
      },
      {
        source: "/auth",
        destination: `${APP_URL}/app/auth`,
      },
      {
        source: "/auth/:path+",
        destination: `${APP_URL}/app/auth/:path+`,
      },
    ];
  },
};

export default nextConfig;
