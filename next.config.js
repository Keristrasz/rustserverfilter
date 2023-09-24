/\*_ @type {import('next').NextConfig} _/;
const path = require("path");
const withTM = require("next-transpile-modules")(["frappe-charts"]);

const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Makes async headers not working, only one async headers is allowed
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  async headers() {
    return process.env.NEXT_PUBLIC_IS_MOCKED
      ? []
      : [
          {
            source: "/:path*", // Match any route, including top-level routes
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
                  "default-src 'self'; style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; img-src 'self' https://flagsapi.com/; script-src 'self' https://vercel.live https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' https://realm.mongodb.com https://vitals.vercel-insights.com/ https://ipapi.co/; object-src 'none'",
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
                value: "strict-origin-when-cross-origin",
              },
              // Disallow permissons
              {
                key: "Permissions-Policy",
                value:
                  "camera=(), geolocation=(), microphone=(), payment=(), gyroscope=(), magnetometer=()",
              },
              // Ouudated Permissions Policy but maybe supported by old browsers
              // {
              //   key: "Feature-Policy",
              //   value:
              //     "camera 'none'; geolocation 'none'; microphone 'none'; payment 'none'; gyroscope 'none'; magnetometer 'none'",
              // },
              // Protection for older browsers
              {
                key: "X-XSS-Protection",
                value: "1; mode=block",
              },
              // Website's resources (such as APIs, images, or fonts) can be accessed by requests originating from any other domain.
              {
                key: "Access-Control-Allow-Origin",
                value: "https://rustserverfilter.com/",
              },
            ],
          },
        ];
  },
  webpack: (config, { isServer }) => {
    // Add the file-loader rule
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
      include: path.resolve(__dirname, "public/fonts"),
      generator: {
        filename: "fonts/[name].[hash][ext]",
      },
    });

    return config;
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/sitemap.xml",
  //       destination: "/api/sitemap",
  //     },
  //   ];
  // },
};

module.exports = withTM(nextConfig);

// module.exports = nextConfig;

//for caching the pages correctly, but doesnt look like its working?
// async headers() {
// return [
// {
// source: "/path/to/static/page",
// headers: [
// {
// key: "Cache-Control",
// value: "s-maxage=600, stale-while-revalidate",
// },
// ],
// },
// ];
// },
