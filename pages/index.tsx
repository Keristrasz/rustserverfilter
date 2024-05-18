import React, { useState, useEffect } from "react";
import { InfiniteData } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import getAppAuth from "@/services/getAppAuth";
import {
  userLocationType,
  SorterType,
  FilterType,
  QueryResponseType,
} from "../types/TGlobal";
import { pageSize } from "@/constants/pageSize";

import useUserAuth from "../hooks/useUserAuth";
import useQueryLocation from "@/hooks/useQueryLocation";

import BodyWrapper from "@/components/HOC/BodyWrapper";
import { Table } from "@/components/UI/Table";
import { Form } from "@/components/UI/Form";
import { typesConfigs } from "@/constants/serverTypeOptions";

//TODO Distance sort by loaded initialDataSSG

import { fetchAllServers } from "@/services/fetchAllServers";
import { toast } from "react-toastify";

export const getStaticProps: GetStaticProps = async () => {
  // Fetch initialSorter and initialFilter from an API or any other initialDataSSG source
  const initialSorterSSG: SorterType = { players: -1 };
  const initialFilterSSG: FilterType = {
    $and: [{ rank: { $gte: 500 } }, { players: { $gte: 0 } }],
  };

  const _initialDataSSG: QueryResponseType = await fetchAllServers(
    initialFilterSSG,
    initialSorterSSG,
    0,
    pageSize,
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
    {
      toast.warning(
        "Rust Server Filter is shutting down. Data will no longer be maintained and updated.",
        {
          autoClose: 20000,
        }
      );
    }
  }, []);

  return (
    <BodyWrapper>
      <Head>
        <title>Rust Server Filter | All public Rust servers</title>
        <meta property="og:locale" content="en_US" />

        <meta
          name="description"
          content="The most advanced FILTERS for Rust servers! Discover FUTURE WIPES! Filter SOLO DUO TRIO QUAD servers. Find best rust servers by last wipe, distance, mod and more!"
          key="desc"
        />
        <meta
          property="og:title"
          content="Rust Server Filter | Solo, Duo, Trio - Best Servers"
        />
        <meta
          property="og:description"
          content="The most advanced FILTERS for Rust servers! Discover FUTURE WIPES! Filter SOLO DUO TRIO QUAD servers. Find best rust servers by last wipe, distance, mod and more!"
        />

        <meta
          property="og:image"
          content="https://rustserverfilter.com/logo-og.jpg"
        />
        <meta property="og:url" content="https://rustserverfilter.com/" />
        <meta property="og:type" content="website" />

        <link rel="canonical" href="https://rustserverfilter.com" />
        <meta property="og:type" content="website" />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/icons/favicon-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-icon-192x192.png"
        ></link>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/icons/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-icon-180x180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/apple-icon.png"
        />
        <link rel="manifest" href="/icons/manifest.json" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#d44026" />
        <meta
          name="msapplication-TileImage"
          content="/icons/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#d44026" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#d44026"
        />
        <meta name="apple-mobile-web-app-title" content="Rust Server Filter" />
        <meta name="application-name" content="Rust Server Filter" />
      </Head>
      <section className="text-center bg-zinc-800 rounded-lg p-8 py-4 mx-4 mt-10 max-w-6xl border border-black w-full">
        <p className="text-lg mb-2 font-rust sm:text-2xl tracking-[0.065rem]">
          Welcome to Rust Server Filter!
        </p>
        <p>
          Are you looking for a Rust server to play? Here you can find your
          server with advanced filters and with great user experience. You can
          filter by server rates, group size, wipe date, distance, map size,
          wipre rotations, countries, distance and more. Find your server here
          and check its server details for more!
        </p>
      </section>
      <Form
        userLocation={userLocation}
        setFilter={setFilter}
        setSorter={setSorter}
        filter={filter}
        sorter={sorter}
        isSSG={isSSG}
      />
      <Table
        app={app}
        filter={filter}
        sorter={sorter}
        setFilter={setFilter}
        setSorter={setSorter}
        userLocation={userLocation}
        initialDataSSG={initialDataSSG}
        isSSG={isSSG}
      />
      <section className="bg-zinc-800 rounded-lg p-10 pt-6 pb-4 mx-4 mb-8 max-w-6xl border border-black w-full">
        <h2 className="w-full font-semibold text-xl text-center sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4 sm:ml-0 ">
          Did you not find server you are looking for? Try out our predefined
          types:
        </h2>
        <div className="flex flex-wrap mb-4">
          {typesConfigs.map((link, index) => (
            <Link
              key={index}
              href={`/type/${link.href}`}
              className="cursor-pointer rounded-md p-2 pt-1 pb-0.5 mr-2 mb-1 text-center border bg-zinc-700 border-black hover:bg-rustOne"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </section>
    </BodyWrapper>
  );
}

export default Home;
