import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
// import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import ErrorBoundary from "../components/HOC/ErrorBoundary";
import { Layout } from "../components/UI/Layout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  // const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = (url: any) => {
  //     gtag.pageview(url);
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        {/* Adsense */}
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7866529652972535"
            crossOrigin="anonymous"
          />
        </Head>
        {/* Adsense */}
        {/* <Script
          id="adsense"
          strategy="lazyOnload"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7866529652972535"
        ></Script> */}
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="ga-tracking" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
      page_path: window.location.pathname,
    });
  `}
        </Script>
        <ErrorBoundary fallback="Error">
          <Component {...pageProps} />
          <ToastContainer autoClose={5000} position="top-center" />
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
