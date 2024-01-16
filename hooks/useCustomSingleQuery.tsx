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

    const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
    if (!mongodb) return;

    const collection = mongodb.db("cluster6").collection("serverprimarycollections");

    const result = await collection.findOne(query, { projection });

    return result;
  };

  const queryKey = ["searchSingleResult", ip];

  const queryFn = async () => {
    // (pageParam);
    const result = await fetchSingleServer(app);
    return result;
  };

  const queryOptions = {
    enabled: !!app && !!app.currentUser,
    keepPreviousData: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: true,
    staleTime: 3000 * 1000,
  };

  const { data, isLoading, isFetching, error, status } = useQuery(
    queryKey,
    queryFn,
    queryOptions
  );
  data;
  return {
    queryData: data,
    isLoading,
    isFetching,
    error,
    status,
  };
};

export default useCustomSingleQuery;
