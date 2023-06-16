import { useQuery } from "@tanstack/react-query";
import useUserAuth from "@/hooks/useUserAuth";

const projection = {
  gametype: 0,
  _id: 0,
};
const useCustomSingleQuery = (ip: string) => {
  const app = useUserAuth();

  const fetchSingleServer = async (app: any) => {
    const query = {
      addr: ip,
    };
    "fetching data" + app;

    const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
    if (!mongodb) return;

    const collection = mongodb.db("cluster6").collection("serverprimarycollections");

    const result = await collection.findOne(query, { projection });

    return result;
  };

  const queryKey = ["searchSingleResult", ip];

  ("custom SINGLE query run");

  const queryFn = async () => {
    // (pageParam);
    const result = await fetchSingleServer(app);
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
  };

  const { data, isLoading, error, status } = useQuery(queryKey, queryFn, queryOptions);
  data;
  return {
    data,
    isLoading,
    error,
    status,
  };
};

export default useCustomSingleQuery;
