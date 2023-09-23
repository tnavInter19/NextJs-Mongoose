/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  images: {
    domains: ["ui-avatars.com", "tailwindui.com"], // Add the external domain here
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
