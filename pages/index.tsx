"use client";
import React, { useState } from "react";
import { userLocationType, SorterType, FilterType } from "../utils/typesTypescript";
import useUserAuth from "../hooks/useUserAuth";
import useGeolocation from "@/hooks/useGeolocation";
import useSorter from "@/hooks/useSorter";
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

  const { updateSorter } = useSorter(setFilter, setSorter);

  return (
    <div className="flex flex-col items-center min-h-screen ">
      <header className="w-full bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Search Form</h1>
      </header>
      <Form userLocation={userLocation} setFilter={setFilter} setSorter={setSorter} />

      <ResultsTable
        app={app}
        filter={filter}
        updateSorter={updateSorter}
        sorter={sorter}
        userLocation={userLocation}
      />
    </div>
  );
}

export default Home;
