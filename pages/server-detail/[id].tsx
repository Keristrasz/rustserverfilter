import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { toast } from "react-toastify";
import Head from "next/head";
import fs from "fs";
import path from "path";

import { getCustomShortDate, getTimeUptime } from "@/utils/timeFunctions";
import { calculateDistance } from "@/utils/calculateDistance";
import { getLocation } from "@/services/getLocation";
import { LocationData } from "@/constants/TGlobal";
import {
  userLocationType,
  SorterType,
  FilterType,
  ServerPrimaryDataType,
  QueryResponseType,
} from "@/constants/TGlobal";
import { fetchAllServers } from "@/services/fetchAllServers";
import fetchSingleServer from "@/services/fetchSingleServer";
import getAppAuth from "@/services/getAppAuth";
import { groupSizeOptions } from "@/constants/formInputOptions";

import BodyWrapper from "@/components/HOC/BodyWrapper";
import { Spinner } from "@/components/UI/Spinner";
import ServerGraphs from "@/components/page-components/server-detail/ServerPlayersGraph";

import useCustomSingleQuery from "@/hooks/useCustomSingleQuery";
import useQueryLocation from "@/hooks/useQueryLocation";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import useCustomSingleQuery from "@/hooks/useCustomSingleQuery";
// import { Spinner } from "@/components/UI/Spinner";
// import { getCustomShortDate, getTimeUptime } from "@/utils/timeFunctions";
// import { getLocation } from "@/services/getLocation";
// import { calculateDistance } from "@/utils/calculateDistance";
// import BodyWrapper from "@/components/HOC/BodyWrapper";
// import { LocationData } from "@/constants/TGlobal";
// import Head from "next/head";
// import {
//   userLocationType,
//   SorterType,
//   FilterType,
//   ServerPrimaryDataType,
//   QueryResponseType,
// } from "@/constants/TGlobal";
// import ServerGraphs from "@/components/page-components/server-detail/ServerPlayersGraph";
// import { toast } from "react-toastify";
// import useQueryLocation from "@/hooks/useQueryLocation";
// import { fetchAllServers } from "@/services/fetchAllServers";
// import fetchSingleServer from "@/services/fetchSingleServer";
// import { GetStaticProps, GetStaticPaths } from "next";

// import getAppAuth from "@/services/getAppAuth";

// import fs from "fs";
// import path from "path";

// import { groupSizeOptions } from "@/constants/formInputOptions";

function replaceLastDotWithColon(input: string) {
  const lastIndex = input.lastIndexOf(".");
  if (lastIndex !== -1) {
    return input.substring(0, lastIndex) + ":" + input.substring(lastIndex + 1);
  }
  return input;
}

function replaceGroupSizeWithName(input: number) {
  const foundOption = groupSizeOptions.find((el) => el.value === input);
  if (foundOption) {
    return foundOption.label;
  }
}

// should dedupe the fetch requests

export const getStaticPaths: GetStaticPaths = async () => {
  const projection: {
    $project: {
      [key: string]: 0 | 1;
    };
  } = {
    $project: { id: 0, players_history: 0 },
  };
  const initialSorter: SorterType = { players: -1 };
  const initialFilter: FilterType = {
    $and: [{ rank: { $gte: 570 } }, { players: { $gte: 0 } }],
  };
  let initialData: QueryResponseType | null = null;

  try {
    const app = await getAppAuth();

    initialData = await fetchAllServers(
      initialFilter,
      initialSorter,
      0,
      2000,
      app,
      projection
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // folder has to be in public
  // create a json file to store information for getStaticProps == SSG
  const file = path.join(process.cwd(), "public/mainSlugBuildData.json");
  fs.writeFileSync(file, JSON.stringify(initialData), "utf-8");

  const paths = initialData!.result.map((page: ServerPrimaryDataType) => ({
    params: { id: page.addr.toString().split(":").join(".") },
  }));

  return {
    paths,
    fallback: "blocking", // Generates page on request
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const app = await getAppAuth();
  // get data stored from getStaticPaths
  const fileToReadJSONFrom = path.join(process.cwd(), "public/mainSlugBuildData.json");
  const dataFromGetStaticPaths = JSON.parse(
    fs.readFileSync(fileToReadJSONFrom, "utf-8")
  ) as QueryResponseType;

  //@ts-ignore - id always exists
  const { id } = params;
  const fetchIP = replaceLastDotWithColon(id.toString());
  let initialDataSSG = dataFromGetStaticPaths.result.find((page: ServerPrimaryDataType) => {
    return fetchIP === page.addr;
  });
  if (!initialDataSSG) {
    initialDataSSG = await fetchSingleServer(app, fetchIP);
  }

  return {
    props: {
      initialDataSSG,
    },
    // revalidate: 60, // Re-generate the page every 60 seconds (optional) when user comes to the site
  };
};

interface ServerDetailsPageTypes {
  initialDataSSG: ServerPrimaryDataType;
  // isSSG: Boolean;
}

const ServerDetailsPage: React.FC<ServerDetailsPageTypes> = ({ initialDataSSG }) => {
  // // let isMobile = false;
  // // let chartWidth = 518;
  // // let chartHeight = 362;

  // const MOBILE_WIDTH_THRESHOLD = 640; // Adjust the threshold as needed
  // let isMobile =
  //   typeof window !== "undefined" && window.innerWidth < MOBILE_WIDTH_THRESHOLD;
  // // if (isMobile) {
  // //   // chartHeight = 362;
  // //   // chartWidth = 318;
  // //   chartHeight = 100;
  // //   chartWidth = 100;
  // // }

  // let chartWidth = isMobile ? 318 : 518;
  // let chartHeight = isMobile ? 362 : 362;

  const router = useRouter();
  const { id } = router.query;
  const fetchIP = id ? replaceLastDotWithColon(id.toString()) : null;
  const { queryData, isLoading, isFetching, error, status } = useCustomSingleQuery(
    fetchIP as string
  );

  let data = initialDataSSG;
  if (queryData) {
    data = queryData;
  }

  const userLocation: userLocationType | null = useQueryLocation() || null;

  const [serverLocationData, setServerLocationData] = useState<LocationData | undefined>();

  useEffect(() => {
    const fetchServerLocation = async () => {
      try {
        const { latitude, longitude, country, city, region } = await getLocation(
          data?.addr.split(":").slice(0, 1)[0]
        );
        setServerLocationData({ latitude, longitude, country, city, region });
      } catch (error) {
        console.log(error);
      }
    };
    fetchServerLocation();
  }, [data?.addr]);

  const [isSSG, setIsSSG] = useState(false);

  useEffect(() => {
    setIsSSG(true);
  }, []);

  const handleCopyClick = () => {
    const textToCopy = data.addr.split(":").slice(0, 1)[0] + ":" + data.gameport;
    navigator.clipboard
      .writeText("client.connect " + textToCopy)
      .then(() => {
        toast.success("Copied! Now you can join through rust game console.");
      })
      .catch((error) => {
        console.log("Copy failed:", error);
      });
  };

  function isUrl(value: string): boolean {
    // Regular expression pattern to validate the URL format
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
    return urlPattern.test(value);
  }

  return (
    <BodyWrapper>
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
            (data.born_next ? "Next wipe: " + getCustomShortDate(data.born_next) + ". " : "") +
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
            (data.born_next ? "Next wipe: " + getCustomShortDate(data.born_next) + ". " : "") +
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
        <meta property="og:url" content={`https://rustserverfilter.com/server-detail/${id}`} />
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
      <div className="max-w-[1400px] m-4 flex flex-col justify-center items-center">
        <h2 className="text-xs break-words text-gray-300">{data.name}</h2>
        {isFetching ? (
          <div className="flex m-1 my-2">
            <Spinner size={8} />
            <p className="text-2xl text-gray-200">Loading server details...</p>
          </div>
        ) : (
          <p className="text-2xl m-1 my-2 text-gray-200"> Server details loaded</p>
        )}
        {error instanceof Error && <div>An error has occurred: {error.message}</div>}
        {((status === "success" && isSSG) || initialDataSSG) && (
          <main className="flex flex-col items-center mt-1">
            {data && (
              <section className="max-w-3xl flex flex-col border border-black bg-zinc-800 rounded-2xl p-6 py-4">
                <p className="text-lg font-medium text-rustFour">Server name:</p>
                <h1 className="text-2xl font-bold break-words text-gray-300 mb-4">
                  {data.name}
                </h1>
                {/* SERVER INFO */}
                <div className="md:flex md:flex-wrap mb-4">
                  {/* BASIC INFO */}
                  <div className="mr-4 mb-4">
                    <h4 className="text-lg font-medium text-rustFour">Server info:</h4>
                    {data.rank && <p className="text-gray-300">Score: {data.rank / 100}</p>}
                    <p className="text-gray-300">
                      Game Ip:{" "}
                      <span
                        className="font-bold text-rustFour hover:cursor-pointer hover:text-green-570"
                        onClick={handleCopyClick}
                      >
                        {data.addr.split(":").slice(0, 1) + ":" + data.gameport}
                      </span>
                    </p>

                    <p className="text-gray-300">
                      Players: {data.players} / {data.max_players}
                    </p>
                    <p className="text-gray-300" suppressHydrationWarning={true}>
                      Last Wipe: {getCustomShortDate(data.born)}
                    </p>
                    <p className="text-gray-300" suppressHydrationWarning={true}>
                      Next Wipe: {getCustomShortDate(data.born_next)}
                    </p>
                    {data.rate ? (
                      <p className="text-gray-300">Rate: {data.rate}x</p>
                    ) : (
                      <p className="text-gray-300">Rate:</p>
                    )}
                    <p className="text-gray-300">Max Group Size: {data.max_group_size}</p>
                    <p className="text-gray-400">Map Size: {data.rules?.size}</p>
                    <p className="text-gray-400">Seed: {data.rules?.seed}</p>
                  </div>
                  {/* ADDITIONAL INFO */}

                  <div className="mb-2 mr-4">
                    <h4 className="text-lg font-medium text-rustFour">Aditional info:</h4>

                    {data.rules?.url ? (
                      <p className="text-gray-400">
                        URL:{" "}
                        {isUrl(data.rules.url) ? (
                          <a
                            className="text-blue-400 underline hover:text-blue-570"
                            href={data.rules.url}
                          >
                            {data.rules.url.length > 25
                              ? data.rules.url.slice(0, 25) + "..."
                              : data.rules.url}
                          </a>
                        ) : (
                          <span>{data.rules.url}</span>
                        )}
                      </p>
                    ) : (
                      <p className="text-gray-400">URL: </p>
                    )}
                    <p className="text-gray-400">Modded: {data.modded ? "Yes" : "No"}</p>
                    <p className="text-gray-400">Vanilla: {data.vanilla ? "Yes" : "No"}</p>
                    <p className="text-gray-400">Wipe Rotation: {data.wipe_rotation}</p>
                    <p className="text-gray-400">Softcore/Hardcore: {data.difficulty}</p>

                    {data.rules?.uptime ? (
                      <p className="text-gray-400" suppressHydrationWarning={true}>
                        Server uptime: {getTimeUptime(data.rules?.uptime)}
                      </p>
                    ) : (
                      <p className="text-gray-400">Server uptime:</p>
                    )}

                    <p className=" text-gray-400">Query Ip: {data.addr}</p>
                    <p className="text-gray-400">FPS Average: {data.rules?.fps_avg}</p>
                  </div>

                  {/* LOCATION */}

                  {data.rules?.location ? (
                    <div className="">
                      <h4 className="text-lg font-medium text-rustFour">Location:</h4>
                      <p className="text-gray-300">Country: {data.rules?.location?.country}</p>
                      <p className="text-gray-300">
                        Distance:{" "}
                        {userLocation &&
                        data.rules?.location?.latitude &&
                        data.rules?.location?.longitude
                          ? calculateDistance(
                              data.rules?.location?.latitude,
                              data.rules?.location?.longitude,
                              userLocation.latitude,
                              userLocation.longitude
                            ) + " km"
                          : ""}
                      </p>
                      {serverLocationData?.region ? (
                        <p className="text-gray-400">Region: {serverLocationData.region}</p>
                      ) : (
                        <p className="text-gray-400">Region:</p>
                      )}
                      {serverLocationData?.city ? (
                        <p className="text-gray-400">City: {serverLocationData.city}</p>
                      ) : (
                        <p className="text-gray-400">City:</p>
                      )}

                      <p className="text-gray-400">Latitude: {data.rules.location.latitude}</p>
                      <p className="text-gray-400">
                        Longitude: {data.rules.location.longitude}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-lg font-medium text-rustFour">Location</h4>
                      {serverLocationData?.country && (
                        <p className="text-gray-300">Country: {serverLocationData.country}</p>
                      )}
                      {serverLocationData?.latitude &&
                        serverLocationData?.longitude &&
                        userLocation && (
                          <p className="text-gray-300">
                            Distance:{" "}
                            {calculateDistance(
                              serverLocationData.latitude,
                              serverLocationData.longitude,
                              userLocation.latitude,
                              userLocation.longitude
                            )}{" "}
                            km
                          </p>
                        )}
                      {serverLocationData?.region && (
                        <p className="text-gray-400">Region: {serverLocationData.region}</p>
                      )}
                      {serverLocationData?.city && (
                        <p className="text-gray-400">City: {serverLocationData.city}</p>
                      )}

                      {serverLocationData?.latitude && (
                        <p className="text-gray-300">
                          Latitude: {serverLocationData.latitude}
                        </p>
                      )}
                      {serverLocationData?.longitude && (
                        <p className="text-gray-300">
                          Longitude: {serverLocationData.longitude}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* DESCRIPTION */}

                <div>
                  <h3 className="text-xl font-medium text-rustFour">Description:</h3>
                  {data.rules?.description ? (
                    <p className="text-gray-300">
                      {data.rules.description
                        .replace(/(?<=\S)\\t(?=\S)/g, " ")
                        .replace(/(?<=\S)\\n(?=\S)/g, " ")
                        .replace(/\\n|\\t/g, "")}
                    </p>
                  ) : (
                    <p className="text-gray-300">No description available.</p>
                  )}
                </div>
              </section>
            )}
            {data.players_history ? (
              <ServerGraphs players_history={data.players_history} />
            ) : (
              <section className="flex flex-wrap justify-center my-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <article
                    key={index}
                    className={`flex flex-col text-center justify-center items-center m-2 border border-black bg-zinc-800 rounded-2xl p-2 h-[362px] w-[318px] sm:h-[362px] sm:w-[518px]`}
                  >
                    <h3 className="text-xl font-bold text-gray-200 mb-4">Loading...</h3>
                    <div className="bg-zinc-600 animate-pulse rounded-md w-[95%] h-[80%]"></div>
                  </article>
                ))}
              </section>
            )}
          </main>
        )}
      </div>
    </BodyWrapper>
  );
};

export default ServerDetailsPage;
