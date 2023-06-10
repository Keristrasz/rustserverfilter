// import * as Realm from "realm-web";
// import { useQuery } from "@tanstack/react-query";

// const useUserAuth = () => {
//   ("userAuthHook");
//   const auth = async () => {
//     const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID || "");
//     ("logging as old user");
//     if (app && !app.currentUser) {
//       ("creating new user");
//       const anonymousUser = Realm.Credentials.anonymous();
//       await app.logIn(anonymousUser);
//     }
//     return app;
//   };

//   const { data: _app } = useQuery({
//     queryKey: ["userAuth"],
//     queryFn: auth,
//     keepPreviousData: true,
//     cacheTime: 1000 * 99999,
//     staleTime: 1000 * 99999,
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//   });

//   return _app;
// };

// export default useUserAuth;
