/** @type {import('next').NextConfig} */


import initialSetup from './initialSetup.mjs';


const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    INFURA_KEY: process.env.INFURA_KEY,
    NETWORK: process.env.NETWORK
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Execute the registerModels function when the development server starts
      initialSetup();
    }

    return config;
  },
};

export default nextConfig;
