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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Defaultly set with Vercel for 2 years, only HTTPS is allowed
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Helps prevent cross-site scripting (XSS), clickjacking and other code injection attacks.
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; font-src 'self' https://fonts.googleapis.com; img-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; connect-src 'self' https://realm.mongodb.com",
          },
          // Site cannot be loaded as iframe (like yb videos) in any other website
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Denies MIME-sniff
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // How much information the browser includes when navigating from the current website (origin) to another | origin-when-cross-origin saves also parameter of URL, but only host, port, url is saved
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // Allows only geolocation usage
          {
            key: "Permissions-Policy",
            value: "camera=(); battery=(); geolocation=(self); microphone=()",
          },
          // Protection for older browsers
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
