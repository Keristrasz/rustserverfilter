/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DB_CONNECT_STRING:
      "mongodb+srv://user:7o5InmsZJg2FqIgE@cluster6.jjfy6nr.mongodb.net/cluster6",
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  //for caching the pages correctly, but doesnt look like its working?
  // async headers() {
  //   return [
  //     {
  //       source: "/path/to/static/page",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "s-maxage=600, stale-while-revalidate",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
