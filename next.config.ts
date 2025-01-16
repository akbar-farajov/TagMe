import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ikhadcfhviwmcjcteomd.supabase.co",
        port: "",
      },

      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
