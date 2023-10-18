import React from "react";
import Head from "next/head";

function HeadServerDetail() {
  return (
    <Head>
      <meta property="og:locale" content="en_US" />
      <title>
        {data
          ? data.name.length > 57
            ? data.name.substring(0, 57) + "..."
            : data.name
          : "Server detail - Rust"}
      </title>
      <meta
        name="description"
        content={
          (data.players && data.max_players
            ? "Players: " + data.players + "/" + data.max_players + ". "
            : "") +
          (data.max_group_size
            ? "Group size: " + replaceGroupSizeWithName(data.max_group_size) + ". "
            : "") +
          (data.rate ? "Rate: " + data.rate + "x. " : "") +
          (data.born ? "Last wipe: " + getCustomShortDate(data.born) + ". " : "") +
          (data.born_next
            ? "Next wipe: " + getCustomShortDate(data.born_next) + ". "
            : "") +
          (data.rules?.description && data.rules?.description.length < 150
            ? data.rules.description
                .replace(/(?<=\S)\\t(?=\S)/g, " ")
                .replace(/(?<=\S)\\n(?=\S)/g, " ")
                .replace(/\\n|\\t/g, "")
            : data.rules?.description && data.rules?.description.length >= 150
            ? data.rules.description
                ?.substring(0, 150)
                .replace(/(?<=\S)\\t(?=\S)/g, " ")
                .replace(/(?<=\S)\\n(?=\S)/g, " ")
                .replace(/\\n|\\t/g, "") + "..."
            : data.name
            ? data.name
            : "Specific information about server - Rust")
        }
        key="desc"
      />
      <meta
        property="og:title"
        content={
          data
            ? data.name.length > 57
              ? data.name.substring(0, 57) + "..."
              : data.name
            : "Server detail - Rust"
        }
      />
      <meta
        property="og:description"
        content={
          (data.players && data.max_players
            ? "Players: " + data.players + "/" + data.max_players + ". "
            : "") +
          (data.max_group_size
            ? "Group size: " + replaceGroupSizeWithName(data.max_group_size) + ". "
            : "") +
          (data.rate ? "Rate: " + data.rate + "x. " : "") +
          (data.born ? "Last wipe: " + getCustomShortDate(data.born) + ". " : "") +
          (data.born_next
            ? "Next wipe: " + getCustomShortDate(data.born_next) + ". "
            : "") +
          (data.rules?.description && data.rules?.description.length < 150
            ? data.rules.description
                .replace(/(?<=\S)\\t(?=\S)/g, " ")
                .replace(/(?<=\S)\\n(?=\S)/g, " ")
                .replace(/\\n|\\t/g, "")
            : data.rules?.description && data.rules?.description.length >= 150
            ? data.rules.description
                ?.substring(0, 150)
                .replace(/(?<=\S)\\t(?=\S)/g, " ")
                .replace(/(?<=\S)\\n(?=\S)/g, " ")
                .replace(/\\n|\\t/g, "") + "..."
            : data.name
            ? data.name
            : "Specific information about server - Rust")
        }
      />
      <meta property="og:image" content="https://rustserverfilter.com/logo-og.jpg" />
      <meta
        property="og:url"
        content={`https://rustserverfilter.com/server-detail/${id}`}
      />
      <meta property="og:type" content="website" />

      <meta
        property="canonical"
        content={`https://rustserverfilter.com/server-detail/${id}`}
      />
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
  );
}

export default HeadServerDetail;
