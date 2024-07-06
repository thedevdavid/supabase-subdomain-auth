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
  ],
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/auth",
          destination: "/auth/login",
        },
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
