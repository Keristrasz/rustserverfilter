/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
