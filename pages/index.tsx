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
import getAppAuth from "@/utils/getAppAuth";

//TODO Distance sort by loaded initialDataSSG

import { fetchAllServers } from "@/utils/fetchAllServers";
import { GetStaticProps } from "next";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
  // Fetch initialSorter and initialFilter from an API or any other initialDataSSG source
  const initialSorterSSG: SorterType = { players: -1 };
  const initialFilterSSG: FilterType = {
    $and: [{ rank: { $gte: 500 } }, { players: { $gte: 0 } }],
  };

  // const app = await getAppAuth();
  // const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID || "");
  // if (app && !app.currentUser) {
  //   const anonymousUser = Realm.Credentials.anonymous();
  //   await app.logIn(anonymousUser);
  // }

  const _initialDataSSG: QueryResponseType = await fetchAllServers(
    initialFilterSSG,
    initialSorterSSG,
    0,
    40,
    await getAppAuth()
  );

  const initialDataSSG = {
    pages: [_initialDataSSG],
  };

  return {
    props: {
      initialDataSSG,
    },
    // revalidate: 60, // Re-generate the page every 60 seconds (optional)
  };
};

// Helper function to get initialDataSSG from local storage
const getFromLocalStorage = (key: string, defaultValue: any): any => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  } else {
    return defaultValue;
  }
};

// Helper function to save initialDataSSG to local storage
const saveToLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

interface HomeProps {
  initialDataSSG: InfiniteData<QueryResponseType>;
}

function Home({ initialDataSSG }: HomeProps) {
  const app = useUserAuth();

  const [sorter, setSorter] = useState<SorterType>(
    getFromLocalStorage("sorter", { players: -1 })
  );
  const [filter, setFilter] = useState<FilterType>(
    getFromLocalStorage("filter", {
      $and: [{ rank: { $gte: 500 } }],
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
        <link rel="canonical" href="https://rustserverfilter.com" />

        <meta property="og:type" content="website" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"></link>
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome.png" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/apple-touch-icon.png"
        /> */}
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
        initialDataSSG={initialDataSSG}
        isSSG={isSSG}
      />
    </BodyWrapper>
  );
}

export default Home;
