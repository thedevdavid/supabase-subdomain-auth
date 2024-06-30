/* eslint-disable turbo/no-undeclared-env-vars */
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
        {
          type: "host",
          value: process.env.SITE_DOMAIN,
        },
      ],
      destination: process.env.APP_URL,
      permanent: false,
    },
    {
      source: "/",
      has: [
        {
          type: "cookie",
          key: "supabase-subdomain-auth-code-verifier",
        },
        {
          type: "host",
          value: process.env.SITE_DOMAIN,
        },
      ],
      destination: process.env.APP_URL,
      permanent: false,
    },
    {
      source: "/app/:path*",
      has: [
        {
          type: "host",
          value: process.env.SITE_DOMAIN,
        },
      ],
      destination: `${process.env.APP_URL}/:path*`,
      permanent: true,
    },
    {
      source: "/auth/:path*",
      has: [
        {
          type: "host",
          value: process.env.SITE_DOMAIN,
        },
      ],
      destination: `${process.env.APP_URL}/auth/:path*`,
      permanent: true,
    },
    {
      source: `/docs`,
      has: [
        {
          type: "host",
          value: process.env.SITE_DOMAIN,
        },
      ],
      destination: `${process.env.DOCS_URL}`,
      permanent: false,
    },
    {
      source: `/docs/:path*`,
      has: [
        {
          type: "host",
          value: process.env.SITE_DOMAIN,
        },
      ],
      destination: `${process.env.DOCS_URL}/:path*`,
      permanent: false,
    },
  ],
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/",
          missing: [
            {
              type: "cookie",
              key: "supabase-subdomain-auth",
            },
          ],
          destination: "/home",
        },
        {
          source: "/",
          missing: [
            {
              type: "cookie",
              key: "supabase-subdomain-auth-code-verifier",
            },
          ],
          destination: "/home",
        },
        {
          source: `/`,
          has: [
            {
              type: "host",
              value: process.env.DOCS_DOMAIN,
            },
          ],
          destination: `/docs`,
        },
        {
          source: `/:path*`,
          has: [
            {
              type: "host",
              value: process.env.DOCS_DOMAIN,
            },
          ],
          destination: `/docs/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
