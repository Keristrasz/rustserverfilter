import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  //makes fetched data fresh for 60 seconds - no refetch for this perios

  const queryClient = new QueryClient({
    // Disable automatic retries on failed requests
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        cacheTime: 1000 * 60,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,

        // suspense: true,
        // onError: (error) => {
        //   // Handle error globally, such as redirecting to a login page
        //   if (error?.response?.status === 401) {
        //     // Redirect to login page or show an authentication modal
        //     // Example: history.push('/login');
        //   }
        // },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
