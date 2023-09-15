import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const useInfiniteScroll = (
  hasNextPage: boolean | undefined,
  fetchNextPage: () => void
) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    inView;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  return ref;
};
export default useInfiniteScroll;
