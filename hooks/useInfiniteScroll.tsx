import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const useInfiniteScroll = (hasNextPage: boolean | undefined, fetchNextPage: () => void) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    console.log(inView);
    if (inView && hasNextPage) {
      console.log("fetching next page");
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  return ref;
};
export default useInfiniteScroll;
