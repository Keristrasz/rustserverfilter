const useAuth = async () => {
  console.log(authCount);
  const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID);
  if (app && !app.currentUser) {
    console.log("app && !app.currentUser");
    //this creates new user I guess
    const anonymousUser = Realm.Credentials.anonymous();
    await app.logIn(anonymousUser);
  }
  return app;
};
