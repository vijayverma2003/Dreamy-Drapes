/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["demo.vercel.store", "lh3.googleusercontent.com"] },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

export default nextConfig;
