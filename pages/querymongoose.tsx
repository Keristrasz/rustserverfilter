import { useEffect } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import mongoose from "mongoose";
import { ServerPrimaryDataModel } from "../mongoose/mongoosemodel";
import { ServerPrimaryData } from "../mongoose/mongoosetypescript";

async function getFirstTenObjects(): Promise<ServerPrimaryData[]> {
  try {
    await mongoose.connect(process.env.DB_CONNECT_STRING || "");

    const objects = await ServerPrimaryDataModel.find().limit(10);
    return objects;
  } catch (error) {
    console.error("Error retrieving objects:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

const ServerList = () => {
  const queryClient = new QueryClient();

  const { data, isLoading, error } = useQuery<ServerPrimaryData[]>(
    ["servers"],
    getFirstTenObjects,
    {
      cacheTime: 60000, // 1 minute cache duration
    }
  );

  useEffect(() => {
    queryClient.prefetchQuery(["servers"], () => getFirstTenObjects()); // Prefetch the data on initial load
  }, [queryClient]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      <h1>Servers List</h1>
      {data && Array.isArray(data) && (
        <ul>
          {data.map((server) => (
            <li key={server.addr}>{server.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <ServerList />
  </QueryClientProvider>
);

export default App;
