import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://assets.fedisea.surf/**')],
  },
};

export default withPlausibleProxy({
  customDomain: "https://plausible.ghostbyte.dev",
  scriptName: "script.hash.outbound-links",
})(nextConfig);
