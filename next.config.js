/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  env: {
    NEXTJS_URL: process.env.NEXTJS_URL,
    DB_AWS_ACCESS_KEY: process.env.DB_AWS_ACCESS_KEY,
    DB_AWS_SECRET_KEY: process.env.DB_AWS_SECRET_KEY,
    DB_AWS_REGION: process.env.DB_AWS_REGION,
    BLOCKCHAIN_URL: process.env.BLOCKCHAIN_URL,
  },
});
