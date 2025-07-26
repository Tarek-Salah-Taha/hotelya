/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
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
    // unoptimized: true, // keep this if you're not using Next's image optimization
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en", // or your DEFAULT_LANGUAGE
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
