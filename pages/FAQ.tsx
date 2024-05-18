import React from "react";
import Head from "next/head";
import Link from "next/link";

import BodyWrapper from "@/components/HOC/BodyWrapper";
import { faqData } from "@/constants/faqData";

const FAQ = () => {
  return (
    <BodyWrapper>
      <Head>
        <title>FAQ - Rust Server Filter</title>
        <meta property="og:locale" content="en_US" />

        <meta
          name="description"
          content="How to join rust server with ip? How to get rust server ip? How to find rust server ip? When do rust servers wipe? What time does rust wipe? When does rust wipe?"
          key="desc"
        />
        <meta property="og:title" content="Rust Server Filter - FAQ" />
        <meta
          property="og:description"
          content="How to join rust server with ip? How to get rust server ip? How to find rust server ip? When do rust servers wipe? What time does rust wipe? When does rust wipe?"
        />

        <meta
          property="og:image"
          content="https://rustserverfilter.com/logo-og.jpg"
        />
        <meta property="og:url" content="https://rustserverfilter.com/FAQ" />
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
      <h1 className="text-xs mt-4 text-gray-300">Frequently asked questions</h1>
      <div className="bg-zinc-800 rounded-lg p-10 pt-6 pb-4 m-4 mb-8 max-w-4xl border border-black">
        <h2 className="text-gray-200 text-center font-semibold text-2xl mb-2">
          FAQ
        </h2>
        {faqData.map((faq, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-rustFour text-lg mb-2">{faq.question}</h3>
            <p className="text-gray-200">{faq.answer}</p>
          </div>
        ))}
        <Link
          href="https://discord.gg/D6hF8hhBFjX"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4 className="text-rustFour text-center font-semibold text-xl mb-2 hover:text-rustOne">
            Do you have specific question? Join discord and ask!
          </h4>
        </Link>
      </div>
    </BodyWrapper>
  );
};

export default FAQ;
