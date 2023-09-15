import { useQuery } from "@tanstack/react-query";
import getAppAuth from "@/utils/getAppAuth";

const useUserAuth = () => {
  const { data: _app } = useQuery({
    queryKey: ["userAuth"],
    queryFn: getAppAuth,
    keepPreviousData: true,
    cacheTime: 1000 * 99999,
    staleTime: 1000 * 99999,
  });

  return _app;
};

export default useUserAuth;
