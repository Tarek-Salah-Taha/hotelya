import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
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
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
