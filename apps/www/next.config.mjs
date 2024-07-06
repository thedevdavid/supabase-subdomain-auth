const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const NEXT_PUBLIC_DOCS_DOMAIN = process.env.NEXT_PUBLIC_DOCS_DOMAIN;
const NEXT_PUBLIC_DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL;

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
      destination: NEXT_PUBLIC_APP_URL,
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
      destination: NEXT_PUBLIC_APP_URL,
      permanent: false,
    },
    {
      source: "/app",
      destination: `${NEXT_PUBLIC_APP_URL}`,
      permanent: true,
    },
    {
      source: "/app/:path*",
      destination: `${NEXT_PUBLIC_APP_URL}/:path*`,
      permanent: true,
    },
    {
      source: "/auth",
      destination: `${NEXT_PUBLIC_APP_URL}/auth`,
      permanent: true,
    },
    {
      source: "/auth/:path*",
      destination: `${NEXT_PUBLIC_APP_URL}/auth/:path*`,
      permanent: true,
    },
    {
      source: "/docs",
      missing: [
        {
          type: "host",
          value: NEXT_PUBLIC_DOCS_DOMAIN,
        },
      ],
      destination: `${NEXT_PUBLIC_DOCS_URL}`,
      permanent: true,
    },
    {
      source: "/docs/:path*",
      missing: [
        {
          type: "host",
          value: NEXT_PUBLIC_DOCS_DOMAIN,
        },
      ],
      destination: `${NEXT_PUBLIC_DOCS_URL}/:path*`,
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
        //       value: process.env.NEXT_PUBLIC_DOCS_DOMAIN,
        //     },
        //   ],
        //   destination: `/docs`,
        // },
        // {
        //   source: `/:path*`,
        //   has: [
        //     {
        //       type: "host",
        //       value: process.env.NEXT_PUBLIC_DOCS_DOMAIN,
        //     },
        //   ],
        //   destination: `/docs/:path*`,
        // },
      ],
    };
  },
};

export default nextConfig;
