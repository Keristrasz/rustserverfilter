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

interface HomeProps {
  initialData: InfiniteData<QueryResponseType>;
}

const initialSorter: SorterType = { born_next: 1 };
const initialFilter: FilterType = {
  $and: [{ rank: { $gte: 4000 } }, { players: { $gte: 1 } }],
};

const title = "Upcoming Wipe Servers | Prepare for Fresh Starts - Wipe soon";
const desc =
  "Get ready for fresh starts on soon to wipe servers with our advanced server filter. Filter servers by upcoming wipe cycles, player counts, and distance to jump into a new Rust adventure. Find server now and prepare for a wipe-reset thrill!";
const h1 = "BEST RECENTLY WIPED SERVERS";
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome.png" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
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
