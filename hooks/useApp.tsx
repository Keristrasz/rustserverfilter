import { useEffect, useState } from "react";
import * as Realm from "realm-web";

export function useApp() {
  const [app, setApp] = useState(null);
  // Run in useEffect so that App is not created in server-side environment
  useEffect(() => {
    setApp(Realm.getApp(process.env.NEXT_PUBLIC_APP_ID));
  }, []);
  return app;
}


  // const app = useApp();
  // console.log("authentication" + app);
  // // note: useEffect runs in the browser but does not run during server-side rendering
  // useEffect(() => {
  //   // If no logged in user, log in
  //   if (app && !app.currentUser) {
  //     const anonymousUser = Realm.Credentials.anonymous();
  //     app.logIn(anonymousUser);
  //   }
  // }, [app, app?.currentUser]);

  // const [isLogged, setIsLogged] = useState(false);
