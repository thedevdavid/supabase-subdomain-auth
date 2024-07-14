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
    manualClientBasePath: true,
  },
  basePath: "/app",
  // redirects: async () => [
  //   {
  //     source: "/auth/:path*",
  //     has: [
  //       {
  //         type: "cookie",
  //         key: "appname:session",
  //       },
  //     ],
  //     destination: "/",
  //     permanent: false,
  //   },
  //   {
  //     source: "/",
  //     has: [
  //       {
  //         type: "cookie",
  //         key: COOKIE_NAME,
  //       },
  //     ],
  //     destination: "/app/dashboard",
  //     permanent: false,
  //   },
  //   {
  //     source: "/dashboard/:path*",
  //     missing: [
  //       {
  //         type: "cookie",
  //         key: COOKIE_NAME,
  //       },
  //     ],
  //     destination: "/auth/signin",
  //     permanent: false,
  //   },
  //   {
  //     permanent: true,
  //     source: "/auth",
  //     destination: "/auth/signin",
  //   },
  //   {
  //     source: "/login",
  //     destination: "/auth/signin",
  //     permanent: true,
  //   },
  //   {
  //     source: "/signin",
  //     destination: "/auth/signin",
  //     permanent: true,
  //   },
  // ],
  // rewrites: async () => {
  //   return [
  //     {
  //       source: "/:path+",
  //       destination: "/app/:path+",
  //     },
  //   ];
  // },
};

export default nextConfig;
