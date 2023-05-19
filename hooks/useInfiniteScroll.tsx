import { useEffect } from "react";

const useInfiniteScroll = (
  hasNextPage: boolean | undefined,
  isFetchingNextPage: boolean,
  fetchNextPage: () => void
) => {
  // Infinite scroll event handler
  const handleScroll = () => {
    console.log(hasNextPage);
    if (
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      console.log("fetching next page");
      fetchNextPage();
    }
  };

  // Debounce function
  const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced scroll event handler
  const debouncedHandleScroll = debounce(handleScroll, 250);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);
};

export default useInfiniteScroll;
