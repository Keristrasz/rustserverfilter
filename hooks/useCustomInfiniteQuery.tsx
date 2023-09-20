import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { fetchAllServers } from "@/services/fetchAllServers";
import { pageSize } from "@/constants/pageSize";
import { SorterType, FilterType, QueryResponseType } from "../constants/TGlobal";

const useCustomInfiniteQuery = (filter: FilterType, sorter: SorterType, app: any) => {
  const queryKey = ["searchResults", filter, sorter, pageSize];

  const queryFn = async ({ pageParam }: QueryFunctionContext): Promise<QueryResponseType> => {
    const result = await fetchAllServers(filter, sorter, pageParam, pageSize, app);
    return result;
  };

  const queryOptions = {
    enabled: !!app && !!app.currentUser,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 300,
    cacheTime: 1000 * 300,
    getNextPageParam: (lastPage: QueryResponseType, allPages: QueryResponseType[]) => {
      const totalCount = lastPage.totalCount[0]?.totalCount || 0;
      const totalDocumentsShown = allPages.reduce(
        (count, page) => count + page.result.length,
        0
      );
      // (lastPage, allPages);
      if (totalDocumentsShown < totalCount) {
        return allPages.length; // Return the next page number
      }

      return null; // No more pages to fetch
    },
  };

  const {
    data,
    isFetching,
    isLoading,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(queryKey, queryFn, queryOptions);

  return {
    queryData: data,
    isFetching,
    isLoading,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useCustomInfiniteQuery;
