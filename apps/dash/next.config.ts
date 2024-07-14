import { COOKIE_NAME } from "@repo/supabase/utils/cookies";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
    // Next.js will automatically prefix `basePath` to client side links which
    // is useful when all links are relative to the `basePath` of this
    // application. This option opts out of that behavior, which can be useful
    // if you want to link outside of your zone, such as linking to
    // "/" from "/blog" (the `basePath` for this application).
    // manualClientBasePath: true,
  },
  // basePath: "/app",
  redirects: async () => [
    {
      source: "/auth/:path*",
      has: [
        {
          type: "cookie",
          key: "appname:session",
        },
      ],
      destination: "/",
      permanent: false,
    },
    {
      source: "/",
      has: [
        {
          type: "cookie",
          key: COOKIE_NAME,
        },
      ],
      destination: "/dashboard",
      permanent: false,
    },
    {
      source: "/dashboard/:path*",
      missing: [
        {
          type: "cookie",
          key: COOKIE_NAME,
        },
      ],
      destination: "/auth/login",
      permanent: false,
    },
    {
      source: "/auth",
      destination: "/auth/login",
      permanent: true,
    },
    {
      source: "/login",
      destination: "/auth/login",
      permanent: true,
    },
    {
      source: "/signin",
      destination: "/auth/login",
      permanent: true,
    },
  ],
  rewrites: async () => {
    return [
      {
        source: "/app/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
