import { NextConfig } from "next";
import { getEnvVariable } from "@repo/utils/getEnvVariable";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  transpilePackages: ["@repo/supabase", "@repo/utils"],
  redirects: async () => {
    const APP_URL = getEnvVariable(process.env, "NEXT_PUBLIC_APP_URL");
    const DOCS_URL = getEnvVariable(process.env, "NEXT_PUBLIC_DOCS_URL");
    const COOKIE_NAME = getEnvVariable(process.env, "NEXT_PUBLIC_COOKIE_NAME");

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
        permanent: true,
      },
      {
        source: "/app/:path*",
        destination: `${APP_URL}/:path*`,
        permanent: true,
      },
      {
        source: "/auth/:path*",
        destination: `${APP_URL}/auth/:path*`,
        permanent: true,
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
};

export default nextConfig;
