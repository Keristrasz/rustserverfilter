import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetchData";
import { ServerPrimaryDataType, SorterType, FilterType } from "../utils/typesTypescript";

type QueryResponseType = {
  totalCount: [{ totalCount: number }];
  result: ServerPrimaryDataType[];
};

const useCustomInfiniteQuery = (
  filter: FilterType,
  sorter: SorterType,
  pageSize: number,
  app: any
) => {
  const queryKey = ["searchResults", filter, sorter, pageSize];

  const queryFn = async ({ pageParam }: QueryFunctionContext): Promise<QueryResponseType> => {
    console.log(pageParam);
    const result = await fetchData(filter, sorter, pageParam, pageSize, app);
    return result;
  };

  const queryOptions = {
    enabled: !!app && !!app.currentUser,
    keepPreviousData: true,
    getNextPageParam: (lastPage: QueryResponseType, allPages: QueryResponseType[]) => {
      const totalCount = lastPage.totalCount[0]?.totalCount || 0;
      const totalDocumentsShown = allPages.reduce(
        (count, page) => count + page.result.length,
        0
      );
      console.log(lastPage, allPages);
      if (totalDocumentsShown < totalCount) {
        return allPages.length; // Return the next page number
      }

      return null; // No more pages to fetch
    },
  };

  const { data, isFetching, error, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(queryKey, queryFn, queryOptions);

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
