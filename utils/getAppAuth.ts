import * as Realm from "realm-web";

const getAppAuth = async () => {
  const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID || "");
  if (app && !app.currentUser) {
    const anonymousUser = Realm.Credentials.anonymous();
    await app.logIn(anonymousUser);
  }
  return app;
};

export default getAppAuth;
