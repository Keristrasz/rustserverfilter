/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DB_CONNECT_STRING:
      "mongodb+srv://user:7o5InmsZJg2FqIgE@cluster6.jjfy6nr.mongodb.net/cluster6",
  },
};

module.exports = nextConfig;
