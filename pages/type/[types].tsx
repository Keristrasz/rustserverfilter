import React, { useState, useEffect } from "react";
import { InfiniteData } from "@tanstack/react-query";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import getAppAuth from "@/services/getAppAuth";
import { fetchAllServers } from "@/services/fetchAllServers";
import { typesConfigs } from "@/constants/serverTypeOptions";
import {
  userLocationType,
  SorterType,
  FilterType,
  QueryResponseType,
} from "../../constants/TGlobal";

import useUserAuth from "../../hooks/useUserAuth";
import useQueryLocation from "@/hooks/useQueryLocation";

import BodyWrapper from "@/components/hoc/BodyWrapper";
import { Table } from "@/components/ui/Table";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = typesConfigs.map((config) => ({
    params: { types: config.href },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const serverType = params?.types as string;
  const typeConfig = typesConfigs.find((config) => config.href === serverType);

  if (!typeConfig) {
    return { notFound: true };
  }

  const { title, desc, h1, addr, href, initialSorterSSG, initialFilterSSG } = typeConfig;

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
      title,
      desc,
      h1,
      addr,
      href,
      initialDataSSG,
      initialSorterSSG,
      initialFilterSSG,
    },
    // revalidate: 60, // Re-generate the page every 60 seconds (optional)
  };
};

interface TypesProps {
  title: string;
  desc: string;
  h1: string;
  addr: string;
  href: string;
  initialDataSSG: InfiniteData<QueryResponseType>;
  initialSorterSSG: SorterType;
  initialFilterSSG: FilterType;
}

// const title = "Best 2x Rate Servers | Rust Server Filter - Double the Fun in Rust";
// const desc =
//   "Experience twice the excitement on the best 2x rate servers with our advanced server filter. Find servers with 2x rates for resources, loot, and progression, filtered by wipe cycles, player counts, and distance. Find your 2x server for Rust adventure!";
// const h1 = "BEST 2x RATE SERVERS";
// const addr = "https://rustserverfilter.com/types/types/best-2x-servers";

function Types({
  title,
  desc,
  h1,
  addr,
  href,
  initialDataSSG,
  initialSorterSSG,
  initialFilterSSG,
}: TypesProps) {
  const router = useRouter();
  const { types } = router.query;

  const configType = typesConfigs.find((config) => config.href === types);
  const initialFilterOnFrontEnd = configType?.initialFilterSSG;
  const initialFilter = initialFilterOnFrontEnd ? initialFilterOnFrontEnd : initialFilterSSG;

  const app = useUserAuth();
  const [sorter, setSorter] = useState<SorterType>(initialSorterSSG);
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
        <meta property="og:url" content={`https://rustserverfilter.com/type/${href}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://rustserverfilter.com/type/${href}`} />

        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icons/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-icon-192x192.png"
        ></link>
        <link rel="shortcut icon" type="image/x-icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/apple-icon.png" />
        <link rel="manifest" href="/icons/manifest.json" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#d44026" />
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#d44026" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#d44026" />
        <meta name="apple-mobile-web-app-title" content="Rust Server Filter" />
        <meta name="application-name" content="Rust Server Filter" />
      </Head>
      <h1 className="font-rust mt-8 mb-4 text-4xl sm:text-6xl text-center tracking-[0.065rem] [text-shadow:_6px_6px_0_rgb(0_0_0_/_60%)]">
        {h1}
      </h1>
      <section className="bg-zinc-800 rounded-lg p-10 pt-6 pb-4 m-4 mt-4 max-w-6xl border border-black w-full">
        <h2 className="w-full font-semibold text-xl text-center sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4 sm:ml-0 ">
          {title}
        </h2>
        <p className="w-full sm:w-auto flex-grow text-center sm:flex-grow-0 sm:mr-8 sm:mb-4 sm:ml-0 ">
          {desc}
        </p>
      </section>
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
    </BodyWrapper>
  );
}

export default Types;
