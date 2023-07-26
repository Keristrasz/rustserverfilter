import React from "react";
import BodyWrapper from "@/components/layout/BodyWrapper";
import Head from "next/head";

const FAQ = () => {
  return (
    <BodyWrapper>
      <Head>
        <title>Rust Server Filter | About</title>
        <meta
          name="Rust Server Filter | About - Rust server wipe"
          content="Rust servers wipe. Rust servers list. Rust servers listing. Ruset servers search. Rust servers list. Rust server list. Server list rust"
          key="desc"
        />
        <meta
          property="og:title"
          content="Rust servers wipe. Rust servers list. Rust servers listing. Ruset servers search. Rust servers list. Rust server list. Server list rust"
        />
        <meta property="og:Rust Server Filter | About" content="" />
        <meta property="og:image" content="https://rustserverfilter.com/logo-og.jpg" />
        <meta property="og:url" content="https://rustserverfilter.com/about" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome.png" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <h1 className="text-xs mt-4 text-gray-300">About</h1>
      <div className="bg-zinc-800 rounded-lg p-10 pt-6 pb-4 m-4 mb-8 max-w-4xl border border-black">
        <p className="text-gray-200">
          Are you looking for the best Rust servers to play on? With the Rust Servers Filter
          Finder, you can easily search for servers based on various criteria such as wipe
          frequency, player limit, and server rates. Whether you prefer playing solo, duo,
          trio, or quad, this tool allows you to filter servers that cater to your preferred
          playstyle. Additionally, you can search for servers with specific rates, such as 2x,
          3x, or 5x, to enhance your gaming experience. With advanced filtering options and the
          ability to sort by last wipe, next wipe and distance.
        </p>
        <h2 className="text-rustFour text-lg mb-2">
          What is the difference between this and other rust server listings?
        </h2>
        <p>
          I made this website because other server finders did not meet what we needed. We
          wanted to find upcoming wipes of servers or also filter by solo duo trio and with all
          of that find specific rates. Other server finders do not do that or do that at very
          limited way. So for myself and my friends I provide best rust server list there is!
        </p>
      </div>
      <h3 className="text-gray-400 text-center font-semibold text-xl mb-2">
        Do you have specific question? Join discord and ask!
      </h3>
    </BodyWrapper>
  );
};

export default FAQ;
