/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DEFAULT_PROFILE_IMAGE_PATH: '/images/avatars/profile-image.default.png',
    DEFAULT_BUSINESS_IMAGE_PATH: '/images/avatars/business-image.default.png',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.vivace.theego.dev',
      },
    ],
  },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // },
};

export default nextConfig;
