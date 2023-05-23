import React, { useState } from "react";
import { userLocationType, SorterType, FilterType } from "../utils/typesTypescript";
import useUserAuth from "../hooks/useUserAuth";
import useGeolocation from "@/hooks/useGeolocation";

import ResultsTable from "@/components/ResultsTable";
import Form from "@/components/Form";
//TODO Distance sort by loaded data

function Home() {
  console.log("rerender");
  const app = useUserAuth();

  const [sorter, setSorter] = useState<SorterType | {}>({});
  const [filter, setFilter] = useState<FilterType>({
    $and: [{ rank: { $gte: 50 } }],
  });

  const [userLocation, setUserLocation] = useState<userLocationType | null>(null);
  useGeolocation(userLocation, setUserLocation);

  return (
    <div className="flex flex-col items-center min-h-screen ">
      <Form userLocation={userLocation} setFilter={setFilter} setSorter={setSorter} />
      <ResultsTable
        app={app}
        filter={filter}
        sorter={sorter}
        setFilter={setFilter}
        setSorter={setSorter}
        userLocation={userLocation}
      />
    </div>
  );
}

export default Home;
