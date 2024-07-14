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
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  DOCS_DOMAIN: process.env.NEXT_PUBLIC_DOCS_DOMAIN,
  DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
  SITE_DOMAIN: process.env.NEXT_PUBLIC_SITE_DOMAIN,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  transpilePackages: ["@repo/supabase"],
  redirects: async () => {
    const APP_URL = getEnvVariable("NEXT_PUBLIC_APP_URL");
    const DOCS_URL = getEnvVariable("NEXT_PUBLIC_DOCS_URL");

    return [
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: COOKIE_NAME,
          },
        ],
        destination: `${APP_URL}`,
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
        destination: `${APP_URL}`,
        permanent: false,
      },
      {
        source: "/docs/:path*",
        destination: `${DOCS_URL}/:path*`,
        permanent: false,
      },
      {
        source: "/app/:path*",
        destination: `${APP_URL}/:path*`,
        permanent: false,
      },
      {
        source: "/auth/:path*",
        destination: `${APP_URL}/auth/:path*`,
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
    ];
  },
};

export default nextConfig;
