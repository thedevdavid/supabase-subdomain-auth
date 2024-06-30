/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/dashboard",
      missing: [
        {
          type: "cookie",
          key: "supabase-subdomain-auth",
        },
      ],
      destination: "/login",
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
      destination: "/login",
      permanent: false,
    },
  ],
};

export default nextConfig;
