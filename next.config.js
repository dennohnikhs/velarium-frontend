const configure = require("./env/configure").default;
const { reloadOnPrerender: _, ...i18n } = require("./next-i18next.config").i18n;
configure();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: process.env.NODE_ENV === "development",
  trailingSlash: true,
  images: {},
  i18n,
  typescript: {
    ignoreBuildErrors: process.env.IGNORE_BUILD_ERRORS === "true",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
