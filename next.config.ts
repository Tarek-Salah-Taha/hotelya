const nextConfig = {
  experimental: {
    turbo: true,
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.ipwhois.io/flags/**",
      },
      {
        protocol: "https",
        hostname: "jcnxjvrwruueplpsmdse.supabase.co",
        pathname: "/storage/v1/object/public/hotels/exterior/**",
      },
      {
        protocol: "https",
        hostname: "jcnxjvrwruueplpsmdse.supabase.co",
        pathname: "/storage/v1/object/public/hotels/restaurants/**",
      },
      {
        protocol: "https",
        hostname: "jcnxjvrwruueplpsmdse.supabase.co",
        pathname: "/storage/v1/object/public/hotels/rooms/**",
      },
      {
        protocol: "https",
        hostname: "jcnxjvrwruueplpsmdse.supabase.co",
        pathname: "/storage/v1/object/public/rooms/types/**",
      },
      {
        protocol: "https",
        hostname: "jcnxjvrwruueplpsmdse.supabase.co",
        pathname: "/storage/v1/object/public/avatars/avatars/**",
      },
    ],
  },
};
