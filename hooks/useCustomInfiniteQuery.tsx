import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetchData";

const useCustomInfiniteQuery = (filter, sorter, pageSize, app) => {
  const queryKey = ["searchResults", filter, sorter, pageSize];

  const queryFn = async ({ pageParam }) => {
    const result = await fetchData(filter, sorter, pageParam, pageSize, app);
    return result;
  };

  const queryOptions = {
    enabled: !!app && !!app.currentUser,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage.totalCount[0]?.totalCount || 0;
      const totalDocumentsShown = allPages.reduce(
        (count, page) => count + page.result.length,
        0
      );

      if (totalDocumentsShown < totalCount) {
        return allPages.length; // Return the next page number
      }

      return null; // No more pages to fetch
    },
  };

  const {
    data,
    isFetching,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(queryKey, queryFn, queryOptions);

  return {
    data,
    isFetching,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useCustomInfiniteQuery;
