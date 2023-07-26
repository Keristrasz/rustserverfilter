import React, { useState, useEffect } from "react";
import {
  userLocationType,
  SorterType,
  FilterType,
  QueryResponseType,
} from "../utils/typesTypescript";
import useUserAuth from "../hooks/useUserAuth";
import useQueryLocation from "@/hooks/useQueryLocation";
import ResultsTable from "@/components/HOC/ResultsTable";
import Form from "@/components/HOC/Form";
import BodyWrapper from "@/components/layout/BodyWrapper";
import { InfiniteData } from "@tanstack/react-query";

//TODO Distance sort by loaded initialData

import Head from "next/head";

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
  const app = useUserAuth();

  const [sorter, setSorter] = useState<SorterType>(
    getFromLocalStorage("sorter", { players: -1 })
  );
  const [filter, setFilter] = useState<FilterType>(
    getFromLocalStorage("filter", {
      $and: [{ players: { $gte: 0 } }],
    })
  );

  useEffect(() => {
    saveToLocalStorage("sorter", sorter);
  }, [sorter]);

  useEffect(() => {
    saveToLocalStorage("filter", filter);
  }, [filter]);

  const userLocation: userLocationType | null = useQueryLocation() || null;

  const [isSSG, setIsSSG] = useState(false);

  useEffect(() => {
    setIsSSG(true);
  }, []);

  return (
    <BodyWrapper>
      <Head>
        <title>Rust Server Filter | Solo, Duo, Trio - Best Rust Servers</title>
        <meta property="og:locale" content="en_US" />
        <meta
          name="description"
          content="Discover FUTURE WIPES! Filter SOLO DUO TRIO QUAD servers. Search rates 2x, 3x, 5x. Find best rust servers by advanced filtering, last wipe, distance and more!"
          key="desc"
        />
        <meta
          property="og:title"
          content="Rust Server Filter | Solo, Duo, Trio - Best Servers"
        />
        <meta
          property="og:description"
          content="Discover FUTURE WIPES! Filter SOLO DUO TRIO QUAD servers. Search rates 2x, 3x, 5x. Find best rust servers by advanced filtering, last wipe, distance and more!"
        />
        <meta property="og:image" content="https://rustserverfilter.com/logo-og.jpg" />
        <meta property="og:url" content="https://rustserverfilter.com/" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome.png" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://rustserverfilter.com" />
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
