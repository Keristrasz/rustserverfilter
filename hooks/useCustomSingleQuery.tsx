import { useQuery } from "@tanstack/react-query";
// import { fetchSingleServer } from "@/utils/fetchAllServers";
import useUserAuth from "@/hooks/useUserAuth";

const projection = {
  gametype: 0,
  _id: 0,
  //   "rules.description": 0,
  //   "rules.url": 0,
  //   "rules.seed": 0,
  //   "rules.fpv_avg": 0,
  //   players_history: 0,
  //   gameport: 0,
};
const useCustomSingleQuery = (ip: string) => {
  const app = useUserAuth();

  const fetchSingleServer = async (app: any) => {
    const query = {
      addr: ip,
    };
    console.log("fetching data" + app);

    const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
    if (!mongodb) return;

    const collection = mongodb.db("cluster6").collection("serverprimarycollections");

    const result = await collection.findOne(query, { projection });

    return result;
  };

  const queryKey = ["searchSingleResult", ip];

  console.log("custom SINGLE query run");

  const queryFn = async () => {
    // console.log(pageParam);
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
  console.log(data);
  return {
    data,
    isLoading,
    error,
    status,
  };
};

export default useCustomSingleQuery;
