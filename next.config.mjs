import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  // Use an empty basePath for clean URLs
  basePath: "",
  // Don't add trailing slashes
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    unoptimized: true,
  },
  webpack(config) {
    // Configure webpack to handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

// Configure NextPWA with simple configuration to prevent sw.startsWith error
const pwaConfig = withPWA({
  dest: "public",
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/offline",
  },
})(nextConfig);

// Export the PWA configuration
export default pwaConfig;
