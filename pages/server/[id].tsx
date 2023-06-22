import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCustomSingleQuery from "@/hooks/useCustomSingleQuery";
import Spinner from "@/components/Spinner";
import {
  getCustomDate,
  calculateDistance,
  getTimeUptime,
  getLocation,
} from "@/utils/inputFunctions";
import BodyWrapper from "@/components/layout/BodyWrapper";
import Link from "next/link";
import { LocationData } from "@/utils/typesTypescript";
import Head from "next/head";
import { userLocationType } from "@/utils/typesTypescript";
import ServerGraphs from "@/components/ServerGraphs";
import { toast } from "react-toastify";
import useQueryLocation from "@/hooks/useQueryLocation";

const ServerDetailsPage = () => {
  // let isMobile = false;
  // let chartWidth = 518;
  // let chartHeight = 362;

  const MOBILE_WIDTH_THRESHOLD = 600; // Adjust the threshold as needed
  let isMobile =
    typeof window !== "undefined" && window.innerWidth < MOBILE_WIDTH_THRESHOLD;
  console.log(isMobile);
  // if (isMobile) {
  //   // chartHeight = 362;
  //   // chartWidth = 318;
  //   chartHeight = 100;
  //   chartWidth = 100;
  // }

  let chartWidth = isMobile ? 318 : 518;
  let chartHeight = isMobile ? 362 : 362;

  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error, status } = useCustomSingleQuery(id as string);

  const userLocation: userLocationType | null = useQueryLocation() || null;

  const [serverLocationData, setServerLocationData] = useState<
    LocationData | undefined
  >();
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
            ? data.name.length > 100
              ? data.name.substring(0, 100) + "..."
              : data.name
            : "Server details - Rust"}
        </title>
        <meta
          name="description"
          content={
            data
              ? "Server details - " + data.name
              : "Specific information about server - Rust"
          }
          key="desc"
        />
        <meta
          property="og:title"
          content={
            data
              ? data.name.length > 100
                ? data.name.substring(0, 100) + "..."
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
        <meta property="og:url" content="https://rustserverfilter.com/" />
        <link rel="icon" href="/logo-smallest.png" />
      </Head>

      <div className="m-4 max-w-6xl flex flex-col justify-center items-center ">
        <div>
          <p className="text-xs text-gray-400">Query IP: {id}</p>
          {/* <button
            className={`bg-rustOne text-white font-semibold py-2 px-4 mx-4 rounded sm:w-48 text-lg transition-all cursor-pointer hover:bg-green-600
          `}
            onClick={() => router.push("/", undefined, { shallow: true })}
          >
            Get Back
          </button> */}
        </div>
        {isLoading && (
          <main className="max-w-6xl flex flex-col items-center mt-1">
            <div className="flex m-1 mb-4">
              <Spinner />
              <p className="text-xl font-bold m-1 text-gray-200">
                {" "}
                Loading server details...
              </p>
            </div>
            <article className="flex flex-col border border-black bg-zinc-800 rounded-2xl p-6 py-4">
              {/* FIRST CONTENT */}
              <div className="mb-8 bg-zinc-600 animate-pulse rounded-md h-12 w-auto"></div>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-wrap gap-8">
                  <div className="mb-8 bg-zinc-600 animate-pulse rounded-md w-48 h-4"></div>
                  <div className="mb-8 bg-zinc-600 animate-pulse rounded-md w-48 h-4"></div>
                  <div className="mb-8 bg-zinc-600 animate-pulse rounded-md w-48 h-4"></div>
                </div>
              ))}

              {/* DESCRIPTION */}
              <div className="bg-zinc-600 animate-pulse rounded-md h-48 w-auto"></div>
            </article>
            <article className="flex flex-wrap justify-center my-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center m-2 border border-black bg-zinc-800 rounded-2xl p-2 h-[${chartHeight}px] w-[${chartWidth}px] `}
                >
                  <div className="bg-zinc-600 animate-pulse rounded-md w-[85%] h-[85%]"></div>
                </div>
              ))}
            </article>
          </main>
        )}
        {error instanceof Error && <div>An error has occurred: {error.message}</div>}
        {status === "success" && (
          <main className="max-w-[1400px] flex flex-col items-center mt-1">
            <p className="text-xl m-1 mb-4 text-gray-200"> Server details loaded</p>
            {data && (
              <article className="min-w-800px max-w-2xl flex flex-col border border-black bg-zinc-800 rounded-2xl p-6 py-4">
                <p className="text-lg font-medium text-rustOne">Server name:</p>
                <h1 className="text-2xl font-bold text-gray-200 mb-4">{data.name}</h1>
                {/* FIRST CONTENT */}
                <div className="flex flex-wrap mb-4">
                  <div className="mr-4 mb-4">
                    <h4 className="text-lg font-medium text-rustOne">Server info:</h4>
                    {data.rank && <p className="text-gray-400">Score: {data.rank}</p>}
                    <p className="text-gray-300">
                      Game Ip:{" "}
                      <span
                        className="font-bold text-rustOne hover:cursor-pointer hover:text-green-500"
                        onClick={handleCopyClick}
                      >
                        {data.addr.split(":").slice(0, 1) + ":" + data.gameport}
                      </span>
                    </p>

                    <p className="text-gray-300">
                      Players: {data.players} / {data.max_players}
                    </p>
                    <p className="text-gray-300">Last Wipe: {getCustomDate(data.born)}</p>
                    <p className="text-gray-300">
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
                    <h4 className="text-lg font-medium text-rustOne">Aditional info:</h4>

                    {data.rules?.url && (
                      <p className="text-gray-400">
                        URL:{" "}
                        {isUrl(data.rules.url) ? (
                          <Link className="text-blue-500 underline" href={data.rules.url}>
                            {data.rules.url}
                          </Link>
                        ) : (
                          <span>{data.rules.url}</span>
                        )}
                      </p>
                    )}
                    {/* <p className="text-gray-400">Max Players: {data.max_players}</p> */}
                    <p className="text-gray-400">Modded: {data.modded ? "Yes" : "No"}</p>
                    <p className="text-gray-400">
                      Vanilla: {data.vanilla ? "Yes" : "No"}
                    </p>
                    <p className="text-gray-400">Wipe Rotation: {data.wipe_rotation}</p>
                    <p className="text-gray-400">Gametype: {data.gametype?.join(", ")}</p>
                    <p className="text-gray-400">Softcore/Hardcore: {data.difficulty}</p>
                    <p className="text-gray-400">
                      Server uptime: {getTimeUptime(data.rules?.uptime)}
                    </p>
                    <p className=" text-gray-400">Query Ip: {data.addr}</p>
                    <p className="text-gray-400">FPS Average: {data.rules?.fps_avg}</p>
                  </div>
                  {/* LOCATION */}

                  {data.rules?.location ? (
                    <div className="">
                      <h4 className="text-lg font-medium text-rustOne">Location:</h4>
                      <p className="text-gray-300">
                        Country: {data.rules?.location?.country}
                      </p>
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
                          : "Cannot retrieve location"}{" "}
                      </p>
                      {serverLocationData?.region && (
                        <p className="text-gray-400">
                          Region: {serverLocationData.region}
                        </p>
                      )}
                      {serverLocationData?.city && (
                        <p className="text-gray-400">City: {serverLocationData.city}</p>
                      )}

                      <p className="text-gray-400">
                        Latitude: {data.rules.location.latitude}
                      </p>
                      <p className="text-gray-400">
                        Longitude: {data.rules.location.longitude}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-lg font-medium text-rustOne">Location</h4>
                      {serverLocationData?.country && (
                        <p className="text-gray-300">
                          Country: {serverLocationData.country}
                        </p>
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
                        <p className="text-gray-400">
                          Region: {serverLocationData.region}
                        </p>
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
                  <h3 className="text-xl font-medium text-rustOne">Description:</h3>
                  <p className="text-gray-300"> {data.rules?.description}</p>
                </div>
              </article>
            )}
            {data.players_history && (
              <ServerGraphs players_history={data.players_history} />
            )}
          </main>
        )}
      </div>
    </BodyWrapper>
  );
};

export default ServerDetailsPage;
