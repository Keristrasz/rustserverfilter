import React from "react";
import BodyWrapper from "@/components/layout/BodyWrapper";
import Head from "next/head";
import Link from "next/link";
import { typesConfigs } from "@/utils/typesConfigs";

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
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://rustserverfilter.com/about" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
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
      </Head>
      <h1 className="text-xs mt-4 text-gray-300">About</h1>
      <div className="bg-zinc-800 rounded-lg p-10 pt-6 pb-4 m-4 mb-8 max-w-4xl border border-black">
        <h3 className="text-gray-200 text-center font-semibold text-2xl mb-3">
          About Rust Server Filter
        </h3>
        <div className="mb-6">
          <h2 className="text-rustFour text-lg mb-2">
            Best Rust Servers with advanced filtering!
          </h2>
          <p className="text-gray-200">
            Are you looking for the best Rust servers to play on? With the Rust Servers Filter,
            you can easily search for servers based on various criteria such as wipe, player
            limit, and server rates. Whether you prefer playing solo, duo, trio, or quad, this
            tool allows you to filter servers that cater to your preferred playstyle.
            Additionally, you can search for servers with specific rates, such as 2x, 3x, or
            5x, to enhance your gaming experience. With advanced filtering options and the
            ability to sort by last wipe, next wipe and distance.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-rustFour text-lg mb-2">
            What is the difference between this and other rust server listings?
          </h2>
          <p>
            I made this website because other server finders did not meet what we needed. We
            wanted to find upcoming wipes of servers or also filter by solo duo trio and with
            all of that find specific rates. Also I can see upcoming wipes so we can be ready
            for the first minutes of freshly wiped servers. Other server finders do not do that
            or do that at very limited way. So for myself and my friends I provide best rust
            server list there is!
          </p>
        </div>
        <h2 className="text-rustFour text-lg mb-2">Find servers by below specifications:</h2>
        <div className="flex flex-wrap">
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
        <Link href="https://discord.gg/D6hF8hhBFj" target="_blank" rel="noopener noreferrer">
          <h3 className="text-rustFour text-center font-semibold text-xl my-2 hover:text-rustOne">
            Do you have specific question? Join discord and ask!
          </h3>
        </Link>
      </div>
    </BodyWrapper>
  );
};

export default FAQ;
