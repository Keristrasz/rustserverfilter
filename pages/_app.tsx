import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import ErrorBoundary from "../components/hoc/ErrorBoundary";
import { Layout } from "../components/ui/Layout";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <ErrorBoundary fallback="Error">
          <Component {...pageProps} />
          <ToastContainer autoClose={5000} position="top-center" />
        </ErrorBoundary>
      </Layout>
      <Analytics />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
