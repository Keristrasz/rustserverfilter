import React, { useState } from "react";
import { userLocationType, SorterType, FilterType } from "../utils/typesTypescript";
import useUserAuth from "../hooks/useUserAuth";
import useGeolocation from "@/hooks/useGeolocation";

import ResultsTable from "@/components/HOC/ResultsTable";
import Form from "@/components/HOC/Form";
import BodyWrapper from "@/components/layout/BodyWrapper";
import Heading from "@/components/UI/Heading";

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
    <BodyWrapper>
      {/* <Heading /> */}
      <Form userLocation={userLocation} setFilter={setFilter} setSorter={setSorter} />
      <ResultsTable
        app={app}
        filter={filter}
        sorter={sorter}
        setFilter={setFilter}
        setSorter={setSorter}
        userLocation={userLocation}
      />
    </BodyWrapper>
  );
}

export default Home;
