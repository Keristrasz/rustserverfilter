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
import BodyWrapper from "@/components/layout/BodyWrapper";
import { InfiniteData } from "@tanstack/react-query";
import Head from "next/head";

const roundBySeconds = 100;
const nowMiliseconds = new Date().getTime();
const nowSeconds =
  Math.floor(nowMiliseconds / 1000 / roundBySeconds) * roundBySeconds - 100;

interface HomeProps {
  initialData: InfiniteData<QueryResponseType>;
}

const initialSorter: SorterType = { born_next: 1 };
const initialFilter: FilterType = {
  $and: [
    { rank: { $gte: 4000 } },
    { players: { $gte: 1 } },
    { born_next: { $gte: nowSeconds } },
  ],
};

const title = "Upcoming Wipe Servers | Prepare for Fresh Starts - Wiping soon servers";
const desc =
  "Get ready for fresh start wiping soon servers with our advanced server filter. Find rust server about to wipe, rust servers that wipe today, rust servers wiping soon. Find server now and prepare for a wipe-reset thrill!";
const h1 = "BEST SERVERS WIPING SOON";
const addr = "https://rustserverfilter.com/servers-wipe-soon";

function Home({ initialData }: HomeProps) {
  const app = useUserAuth();
  const [sorter, setSorter] = useState<SorterType>(initialSorter);
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const userLocation: userLocationType | null = useQueryLocation() || null;
  const [isSSG, setIsSSG] = useState(false);
  useEffect(() => {
    setIsSSG(true);
  }, []);

  return (
    <BodyWrapper>
      <Head>
        <title>{title}</title>
        <meta property="og:locale" content="en_US" />
        <meta name="description" content={desc} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="https://rustserverfilter.com/logo-og.jpg" />
        <meta property="og:url" content="https://rustserverfilter.com/" />
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

        <link rel="canonical" href={addr} />
      </Head>
      <h1 className="font-rust mt-8 mb-4 text-6xl text-center tracking-[0.065rem] [text-shadow:_6px_6px_0_rgb(0_0_0_/_60%)]">
        {h1}
      </h1>
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
