import { useQuery } from "@tanstack/react-query";
import getAppAuth from "@/services/getAppAuth";

const useUserAuth = () => {
  const { data: _app } = useQuery({
    queryKey: ["userAuth"],
    queryFn: getAppAuth,
    keepPreviousData: false,
    retry: true,
    cacheTime: 30 * 1000,
  });

  return _app;
};

export default useUserAuth;
