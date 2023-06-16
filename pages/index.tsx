import React, { useState, useEffect } from "react";
import {
  userLocationType,
  SorterType,
  FilterType,
  ServerPrimaryDataType,
  QueryResponseType,
} from "../utils/typesTypescript";
import useUserAuth from "../hooks/useUserAuth";
import useGeolocation from "@/hooks/useGeolocation";

import ResultsTable from "@/components/HOC/ResultsTable";
import Form from "@/components/HOC/Form";
import BodyWrapper from "@/components/layout/BodyWrapper";
import Heading from "@/components/UI/Heading";
import { InfiniteData } from "@tanstack/react-query";

//TODO Distance sort by loaded initialData

import { fetchAllServers } from "@/utils/fetchAllServers";
import * as Realm from "realm-web";
import { GetStaticProps } from "next";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
  // Fetch initialSorter and initialFilter from an API or any other initialData source
  const initialSorter: SorterType = { players: -1 };
  const initialFilter: FilterType = {
    $and: [{ rank: { $gte: 500 } }, { players: { $gte: 20 } }],
  };
  const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID || "");
  if (app && !app.currentUser) {
    const anonymousUser = Realm.Credentials.anonymous();
    await app.logIn(anonymousUser);
  }

  const _initialData: QueryResponseType = await fetchAllServers(
    initialFilter,
    initialSorter,
    0,
    40,
    app
  );

  const initialData = {
    pages: [_initialData],
  };

  return {
    props: {
      initialData,
    },
    // revalidate: 60, // Re-generate the page every 60 seconds (optional)
  };
};

// Helper function to get initialData from local storage
const getFromLocalStorage = (key: string, defaultValue: any): any => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  } else {
    return defaultValue;
  }
};

// Helper function to save initialData to local storage
const saveToLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

interface HomeProps {
  initialData: InfiniteData<QueryResponseType>;
}

function Home({ initialData }: HomeProps) {
  ("rerender");
  const app = useUserAuth();

  const [sorter, setSorter] = useState<SorterType | {}>(
    getFromLocalStorage("sorter", {})
  );
  const [filter, setFilter] = useState<FilterType>(
    getFromLocalStorage("filter", {
      $and: [{ players: { $gte: 1 } }],
    })
  );

  useEffect(() => {
    saveToLocalStorage("sorter", sorter);
  }, [sorter]);

  useEffect(() => {
    saveToLocalStorage("filter", filter);
  }, [filter]);

  const [userLocation, setUserLocation] = useState<userLocationType | null>(null);
  useGeolocation(userLocation, setUserLocation);

  const [isSSG, setIsSSG] = useState(false);

  useEffect(() => {
    setIsSSG(true);
  }, []);

  return (
    <BodyWrapper>
      <Head>
        <title>Rust Server Filter</title>
        <meta
          name="description"
          content="RUST SERVER LIST | Search, filter, sort rust servers by wipe, by solo, duo, trio group size and more"
          key="desc"
        />
        <link rel="icon" href="/logo-smallest.png" />
      </Head>

      <Form
        userLocation={userLocation}
        setFilter={setFilter}
        setSorter={setSorter}
        filter={filter}
        sorter={sorter}
        isSSG={isSSG}
      />
      <ResultsTable
        app={app}
        filter={filter}
        sorter={sorter}
        setFilter={setFilter}
        setSorter={setSorter}
        userLocation={userLocation}
        initialData={initialData}
        isSSG={isSSG}
      />
    </BodyWrapper>
  );
}

export default Home;
