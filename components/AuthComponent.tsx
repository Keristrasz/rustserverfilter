import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useApp } from "@/hooks/useApp";

export default function AuthComponent() {
  const { isLoading, error, data } = useQuery("authentication", () => {
    const app = useApp();
    console.log("authentication" + app);
    // note: useEffect runs in the browser but does not run during server-side rendering
    useEffect(() => {
      // If no logged in user, log in
      if (app && !app.currentUser) {
        const anonymousUser = Realm.Credentials.anonymous();
        app.logIn(anonymousUser);
      }
    }, [app, app?.currentUser]);
    // Authentication logic here
    // Return a promise or fetch request
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render the rest of your app components once authentication is successful
  return <>{/* Your app components */}</>;
}
