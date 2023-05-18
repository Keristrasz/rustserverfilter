import * as Realm from "realm-web";
import { useQuery } from "@tanstack/react-query";

const useUserAuth = () => {
  const auth = async () => {
    const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID);
    if (app && !app.currentUser) {
      console.log("app && !app.currentUser");
      const anonymousUser = Realm.Credentials.anonymous();
      await app.logIn(anonymousUser);
    }
    return app;
  };

  const { data: _app } = useQuery({
    queryKey: ["userAuth"],
    queryFn: auth,
    keepPreviousData: true,
    cacheTime: 1000 * 999999,
    staleTime: 1000 * 999999,
  });

  return _app;
};

export default useUserAuth;
