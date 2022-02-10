/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pokemon",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["raw.githubusercontent.com"],
    minimumCacheTTL: 86400,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
