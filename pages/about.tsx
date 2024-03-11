import React from "react";
import Head from "next/head";
import Link from "next/link";

import { typesConfigs } from "@/constants/serverTypeOptions";

import BodyWrapper from "@/components/HOC/BodyWrapper";

const FAQ = () => {
  return (
    <BodyWrapper>
      <Head>
        <title>About - Rust Server Filter</title>
        <meta property="og:locale" content="en_US" />

        <meta
          name="description"
          content="Rust servers wipe. Best rust servers. Best solo servers. Best duo servers. Best trio servers. Best noob servers. Best beginner servers."
          key="desc"
        />
        <meta property="og:title" content="Rust Server Filter | About" />
        <meta
          property="og:description"
          content="Rust servers wipe. Best rust servers. Best solo servers. Best duo servers. Best trio servers. Best noob servers. Best beginner servers."
        />

        <meta property="og:image" content="https://rustserverfilter.com/logo-og.jpg" />
        <meta property="og:url" content="https://rustserverfilter.com/about" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://rustserverfilter.com/about" />

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
      <h1 className="text-xs mt-4 text-gray-300">About Rust Server Filter</h1>
      <article className="bg-zinc-800 rounded-lg p-10 pt-6 pb-4 m-4 mb-8 max-w-4xl border border-black">
        <h2 className="text-gray-200 text-center font-semibold text-2xl mb-3">
          About Rust Server Filter
        </h2>
        <section className="mb-6">
          <h3 className="text-rustFour text-lg mb-2">Find servers by below specifications:</h3>
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
          <h3 className="text-rustFour text-lg mb-2">
            Best Rust Servers with advanced filtering!
          </h3>
          <p className="text-gray-200">
            Are you looking for the best Rust servers to play on? With the Rust Servers Filter,
            you can easily search for servers based on various criteria such as wipe, player
            limit, and server rates. Whether you prefer playing solo, duo, trio, or quad, this
            tool allows you to filter server for your preferred playstyle. Additionally, you
            can search for servers with specific rates, such as 2x, 3x, or 5x, to find exactly
            what you are looking for. With advanced filtering options and the ability to sort
            by last wipe, next wipe and distance.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="text-rustFour text-lg mb-2">
            What is the difference between this and other rust server listings?
          </h3>
          <p>
            I made this website because other server finders did not meet what we needed. We
            wanted to find upcoming wipes of servers or also filter by solo duo trio and with
            all of that find specific rates. Also I can see upcoming wipes so we can be ready
            for the first minutes of freshly wiped servers. Other server finders do not do that
            or do that at very limited way. So for myself and my friends I provide best rust
            server list there is!
          </p>
        </section>
        <Link href="https://discord.gg/D6hF8hhBFj" target="_blank" rel="noopener noreferrer">
          <h4 className="text-rustFour text-center font-semibold text-xl my-2 hover:text-rustOne">
            Do you have specific question? Join discord and ask!
          </h4>
        </Link>
      </article>
    </BodyWrapper>
  );
};

export default FAQ;
