const APP_URL = process.env.APP_URL;
const DOCS_DOMAIN = process.env.DOCS_DOMAIN;
const DOCS_URL = process.env.DOCS_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/supabase"],
  redirects: async () => [
    {
      source: "/",
      has: [
        {
          type: "cookie",
          key: "supabase-subdomain-auth",
        },
      ],
      destination: APP_URL,
      permanent: false,
    },
    {
      source: "/",
      has: [
        {
          type: "cookie",
          key: "supabase-subdomain-auth-code-verifier",
        },
      ],
      destination: APP_URL,
      permanent: false,
    },
    {
      source: "/app",
      destination: `${APP_URL}`,
      permanent: true,
    },
    {
      source: "/app/:path*",
      destination: `${APP_URL}/:path*`,
      permanent: true,
    },
    {
      source: "/auth",
      destination: `${APP_URL}/auth`,
      permanent: true,
    },
    {
      source: "/auth/:path*",
      destination: `${APP_URL}/auth/:path*`,
      permanent: true,
    },
    {
      source: "/docs",
      missing: [
        {
          type: "host",
          value: DOCS_DOMAIN,
        },
      ],
      destination: `${DOCS_URL}`,
      permanent: true,
    },
    {
      source: "/docs/:path*",
      missing: [
        {
          type: "host",
          value: DOCS_DOMAIN,
        },
      ],
      destination: `${DOCS_URL}/:path*`,
      permanent: true,
    },
  ],
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/home",
        },
        // {
        //   source: `/`,
        //   has: [
        //     {
        //       type: "host",
        //       value: process.env.DOCS_DOMAIN,
        //     },
        //   ],
        //   destination: `/docs`,
        // },
        // {
        //   source: `/:path*`,
        //   has: [
        //     {
        //       type: "host",
        //       value: process.env.DOCS_DOMAIN,
        //     },
        //   ],
        //   destination: `/docs/:path*`,
        // },
      ],
    };
  },
};

export default nextConfig;
