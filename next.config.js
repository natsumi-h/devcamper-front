/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 追加
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "devcamper-backend-natsumih-prd.herokuapp.com",
        port: "",
        pathname: "/uploads/*",
      },
    ],
  },
};

//  port: "8000",
// "https://devcamper-backend-natsumih-stg.herokuapp.com";

module.exports = nextConfig;
