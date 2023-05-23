import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetchData";
import { ServerPrimaryDataType, SorterType, FilterType } from "../utils/typesTypescript";
import { useMemo } from "react";

type QueryResponseType = {
  totalCount: [{ totalCount: number }];
  result: ServerPrimaryDataType[];
};
let pageSize = 40;

const useCustomInfiniteQuery = (filter: FilterType, sorter: SorterType, app: any) => {
  const queryKey = ["searchResults", filter, sorter, pageSize];

  console.log("custom infinity query run");

  const queryFn = async ({ pageParam }: QueryFunctionContext): Promise<QueryResponseType> => {
    // console.log(pageParam);
    const result = await fetchData(filter, sorter, pageParam, pageSize, app);
    return result;
  };

  const queryOptions = {
    enabled: !!app && !!app.currentUser,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    getNextPageParam: (lastPage: QueryResponseType, allPages: QueryResponseType[]) => {
      const totalCount = lastPage.totalCount[0]?.totalCount || 0;
      const totalDocumentsShown = allPages.reduce(
        (count, page) => count + page.result.length,
        0
      );
      // console.log(lastPage, allPages);
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

// const queryOptions = useMemo(() => {
//   return {
//     enabled: !!app && !!app.currentUser,
//     keepPreviousData: true,
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     retry: false,
//     staleTime: 1000 * 60,
//     cacheTime: 1000 * 300,
//     getNextPageParam: (lastPage: QueryResponseType, allPages: QueryResponseType[]) => {
//       const totalCount = lastPage.totalCount[0]?.totalCount || 0;
//       const totalDocumentsShown = allPages.reduce(
//         (count, page) => count + page.result.length,
//         0
//       );
//       console.log(lastPage, allPages);
//       console.log(totalCount, totalDocumentsShown);
//       if (totalDocumentsShown < totalCount) {
//         return allPages.length; // Return the next page number
//       }

//       return null; // No more pages to fetch
//     },
//   };
// }, [app]);
