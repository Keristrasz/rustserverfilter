import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCustomSingleQuery from "@/hooks/useCustomSingleQuery";
import Spinner from "@/components/UI/Spinner";
import {
  getCustomDate,
  calculateDistance,
  getTimeUptime,
  getLocation,
} from "@/utils/inputFunctions";
import BodyWrapper from "@/components/HOC/BodyWrapper";
import { LocationData } from "@/utils/typesTypescript";
import Head from "next/head";
import {
  userLocationType,
  SorterType,
  FilterType,
  ServerPrimaryDataType,
  QueryResponseType,
} from "@/utils/typesTypescript";
import ServerGraphs from "@/components/UI/ServerPlayersGraph";
import { toast } from "react-toastify";
import useQueryLocation from "@/hooks/useQueryLocation";
import { fetchAllServers } from "@/utils/fetchAllServers";
import fetchSingleServer from "@/utils/fetchSingleServer";
import { GetStaticProps, GetStaticPaths } from "next";

import getAppAuth from "@/utils/getAppAuth";
// import * as Realm from "realm-web";

import fs from "fs";
import path from "path";

function replaceLastDotWithColon(input: string) {
  const lastIndex = input.lastIndexOf(".");
  if (lastIndex !== -1) {
    return input.substring(0, lastIndex) + ":" + input.substring(lastIndex + 1);
  }
  return input;
}

// let initialData: any = null; // Define a module-level variable to store the fetched data

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
    $and: [{ rank: { $gte: 500 } }, { players: { $gte: 0 } }],
  };
  let initialData: QueryResponseType | null = null;

  try {
    const app = await getAppAuth();

    initialData = await fetchAllServers(
      initialFilter,
      initialSorter,
      0,
      2500,
      app,
      projection
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // create a json file to store information for getStaticProps == SSG
  const file = path.join(process.cwd(), "public/mainSlugBuildData.json");
  fs.writeFileSync(file, JSON.stringify(initialData), "utf-8");

  //40 must be equal to pagesize

  const paths = initialData.result.map((page: ServerPrimaryDataType) => ({
    // params: { id: page.addr.replace(/:/g, ".").toString() },
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
  ) as Array<{ params: { slug: Array<string>; routeId: string } }>;

  const { id } = params;
  const fetchIP = id ? replaceLastDotWithColon(id.toString()) : null;
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

  // const MOBILE_WIDTH_THRESHOLD = 600; // Adjust the threshold as needed
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
          data?.addr.split(":").slice(0, 1)
        );
        setServerLocationData({ latitude, longitude, country, city, region });
      } catch (error) {
        console.log(error);
      }
    };
    fetchServerLocation();
  }, [data?.addr]);

  const handleCopyClick = () => {
    const textToCopy = data.addr.split(":").slice(0, 1) + ":" + data.gameport;
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
        <title>
          {data
            ? data.name.length > 60
              ? data.name.substring(0, 60) + "..."
              : data.name
            : "Server details - Rust"}
        </title>
        <meta
          name="description"
          content={
            data ? "Server details - " + data.name : "Specific information about server - Rust"
          }
          key="desc"
        />
        <meta
          property="og:title"
          content={
            data
              ? data.name.length > 60
                ? data.name.substring(0, 60) + "..."
                : data.name
              : "Server details - Rust"
          }
        />
        <meta
          property="og:description"
          content={
            data
              ? "Server details - " + data.name
              : "Find FUTURE WIPES! Filter by SOLO DUO TRIO QUAD servers. Sort by LAST WIPED server. Browse server RATES. Limit DISTANCE, MAP SIZE, number of PLAYERS. Look at player history and more!"
          }
        />
        <meta property="og:image" content="https://rustserverfilter.com/logo-og.jpg" />
        <meta property="og:url" content={`https://rustserverfilter.com/${id}`} />
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
      {/* <Head>
        <title>
          {data
            ? data.name.length > 60
              ? data.name.substring(0, 60) + "..."
              : data.name
            : serverName}
        </title>
        <meta
          name="description"
          content={
            data?.rules?.desc
              ? data.rules.desc
              : serverDescription
              ? serverDescription
              : serverName
          }
          key="desc"
        />
        <meta
          property="og:title"
          content={
            data?.rules?.desc
              ? data.rules.desc
              : serverDescription
              ? serverDescription
              : serverName
          }
        />
        <meta
          property="og:description"
          content={data?.rules?.desc ? data.rules.desc : serverDescription}
        />
        <meta property="og:image" content="https://rustserverfilter.com/logo-og.jpg" />
        <meta property="og:url" content={`https://rustserverfilter.com/server-detail/${id}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://rustserverfilter.com/server-detail/${id}`} />

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
      </Head> */}

      <div className="max-w-[1400px] m-4 flex flex-col justify-center items-center ">
        <p className="text-xs text-gray-300">Query IP: {id}</p>
        {isFetching ? (
          <div className="flex m-1 my-2">
            <Spinner size={8} />
            <p className="text-2xl text-gray-200">Loading server details...</p>
          </div>
        ) : (
          <p className="text-2xl m-1 my-2 text-gray-200"> Server details loaded</p>
        )}
        {error instanceof Error && <div>An error has occurred: {error.message}</div>}
        {(status === "success" || initialDataSSG) && (
          <main className="flex flex-col items-center mt-1">
            {data && (
              <section className="max-w-3xl flex flex-col border border-black bg-zinc-800 rounded-2xl p-6 py-4">
                <p className="text-lg font-medium text-rustFour">Server name:</p>
                <h1 className="text-2xl font-bold break-words text-gray-300 mb-4">
                  {data.name}
                </h1>
                {/* FIRST CONTENT */}
                <div className="md:flex md:flex-wrap mb-4">
                  <div className="mr-4 mb-4">
                    <h4 className="text-lg font-medium text-rustFour">Server info:</h4>
                    {data.rank && <p className="text-gray-400">Score: {data.rank / 100}</p>}
                    <p className="text-gray-300">
                      Game Ip:{" "}
                      <span
                        className="font-bold text-rustFour hover:cursor-pointer hover:text-green-500"
                        onClick={handleCopyClick}
                      >
                        {data.addr.split(":").slice(0, 1) + ":" + data.gameport}
                      </span>
                    </p>

                    <p className="text-gray-300">
                      Players: {data.players} / {data.max_players}
                    </p>
                    <p className="text-gray-300" suppressHydrationWarning={true}>
                      Last Wipe: {getCustomDate(data.born)}
                    </p>
                    <p className="text-gray-300" suppressHydrationWarning={true}>
                      Next Wipe: {getCustomDate(data.born_next)}
                    </p>
                    {data.rate ? (
                      <p className="text-gray-300">Rate: {data.rate}x</p>
                    ) : (
                      <p className="text-gray-300">Rate: Unknown</p>
                    )}
                    <p className="text-gray-300">Max Group Size: {data.max_group_size}</p>
                    <p className="text-gray-400">Map Size: {data.rules?.size}</p>
                    <p className="text-gray-400">Seed: {data.rules?.seed}</p>
                  </div>
                  {/* ADDITIONAL INFO */}

                  <div className="mb-2 mr-4">
                    <h4 className="text-lg font-medium text-rustFour">Aditional info:</h4>

                    {data.rules?.url && (
                      <p className="text-gray-400">
                        URL:{" "}
                        {isUrl(data.rules.url) ? (
                          <a
                            className="text-blue-400 underline hover:text-blue-500"
                            href={data.rules.url}
                          >
                            {data.rules.url}
                          </a>
                        ) : (
                          <span>{data.rules.url}</span>
                        )}
                      </p>
                    )}
                    {/* <p className="text-gray-400">Max Players: {data.max_players}</p> */}
                    <p className="text-gray-400">Modded: {data.modded ? "Yes" : "No"}</p>
                    <p className="text-gray-400">Vanilla: {data.vanilla ? "Yes" : "No"}</p>
                    <p className="text-gray-400">Wipe Rotation: {data.wipe_rotation}</p>
                    {/* <p className="text-gray-400">Gametype: {data.gametype?.join(", ")}</p> */}
                    <p className="text-gray-400">Softcore/Hardcore: {data.difficulty}</p>
                    <p className="text-gray-400">
                      Server uptime: {getTimeUptime(data.rules?.uptime) || ""}
                    </p>
                    <p className=" text-gray-400">Query Ip: {data.addr.replace(/:/g, ".")}</p>
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
                          : "Loc. Unavailable"}
                      </p>
                      {serverLocationData?.region && (
                        <p className="text-gray-400">Region: {serverLocationData.region}</p>
                      )}
                      {serverLocationData?.city && (
                        <p className="text-gray-400">City: {serverLocationData.city}</p>
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
                <div className="">
                  <h3 className="text-xl font-medium text-rustFour">Description:</h3>
                  <p className="text-gray-300"> {data.rules?.description}</p>
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
                    className="flex flex-col text-center justify-center items-center m-2 border border-black bg-zinc-800 rounded-2xl p-2 h-[362px] w-[318px] sm:h-[362px] sm:w-[518px]"
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
