import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  //makes fetched data fresh for 60 seconds - no refetch for this perios
  const [queryClient] = useState(() => new QueryClient())

  // const queryClient = new QueryClient({
  //   // Disable automatic retries on failed requests
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 1000 * 60,
  //       cacheTime: 1000 * 60,
  //       refetchOnMount: false,
  //       refetchOnWindowFocus: false,
  //       retry: false,
  //     },
  //   },
  // });

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
