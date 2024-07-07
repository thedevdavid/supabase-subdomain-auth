/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/auth/:path*",
      has: [
        {
          type: "cookie",
          key: "supabase-subdomain-auth",
        },
      ],
      destination: "/",
      permanent: false,
    },
    {
      source: "/dashboard/:path*",
      missing: [
        {
          type: "cookie",
          key: "supabase-subdomain-auth",
        },
      ],
      destination: "/auth/signin",
      permanent: false,
    },
    {
      permanent: true,
      source: "/auth",
      destination: "/auth/signin",
    },
    {
      source: "/login",
      destination: "/auth/signin",
      permanent: true,
    },
    {
      source: "/signin",
      destination: "/auth/signin",
      permanent: true,
    },
  ],
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source:
            "/:path((?!auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
          destination: "/dashboard/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
