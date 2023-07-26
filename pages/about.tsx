import React from "react";
import BodyWrapper from "@/components/layout/BodyWrapper";
import Head from "next/head";
import Link from "next/link";

export const serverLinks = [
  { href: "/best-trio-servers", text: "Best trio servers" },
  { href: "/best-duo-servers", text: "Best duo servers" },
  { href: "/best-solo-servers", text: "Best solo servers" },
  { href: "/best-beginner-servers", text: "Best beginner servers" },
  { href: "/best-pvp-servers", text: "Best pvp servers" },
  { href: "/best-pve-servers", text: "Best pve servers" },
  { href: "/best-rust-servers", text: "Best rust servers" },
  { href: "/servers-wipe-soon", text: "Servers about to wipe" },
  { href: "/best-wiped-servers", text: "Best wiped just now servers" },
  { href: "/facepunch", text: "Facepunch rust servers" },
  { href: "/reddit", text: "Reddit rust servers" },
  { href: "/rustafied", text: "Rustafied rust servers" },
  { href: "/rusticated", text: "Rusticated rust servers" },
  { href: "/rustoria", text: "Rustoria rust servers" },
  { href: "/rusty-moose", text: "Rusty Moose rust servers" },
  { href: "/survivors", text: "Survivors.gg rust servers" },
  { href: "/vital-rust", text: "Vital Rust servers" },
  { href: "/warbandits", text: "Warbandits rust servers" },
];

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
            all of that find specific rates. Other server finders do not do that or do that at
            very limited way. So for myself and my friends I provide best rust server list
            there is!
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-rustFour text-lg mb-2">Upcoming rust wipes!</h2>
          <p>
            Yes, finally I can find my favorite rust servers in advance for the first day of
            the wipe. Server list rust filtered by exactly what I want and sorted by wipes!
          </p>
        </div>
        <h2 className="text-rustFour text-lg mb-2">Find servers by below specifications:</h2>
        <div className="flex flex-wrap">
          {serverLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
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
