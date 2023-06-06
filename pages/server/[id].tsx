import React, { useEffect, useState } from "react";
import useGeolocation from "@/hooks/useGeolocation";
import { useRouter } from "next/router";
import useCustomSingleQuery from "@/hooks/useCustomSingleQuery";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
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

const ServerDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error, status } = useCustomSingleQuery(id as string);

  const [userLocation, setUserLocation] = useState<userLocationType | null>(null);
  useGeolocation(userLocation, setUserLocation);

  const [serverLocationData, setServerLocationData] = useState<LocationData | undefined>();
  console.log(serverLocationData);
  useEffect(() => {
    const fetchServerLocation = async () => {
      try {
        const { latitude, longitude, country, city, region } = await getLocation(
          data.addr.split(":").slice(0, 1)
        );
        // Do something with the location data, such as updating the state
        setServerLocationData({ latitude, longitude, country, city, region });
      } catch (error) {
        console.log(error);
      }
    };

    fetchServerLocation();
  }, [data?.addr]);

  function isUrl(value: string): boolean {
    // Regular expression pattern to validate the URL format
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
    return urlPattern.test(value);
  }

  const renderPlayerHistoryGraph = () => {
    if (data && data.players_history) {
      console.log(data.players_history);
      const formattedData = data.players_history.map((entry: Number[]) => ({
        timestamp: entry[1],
        playerCount: entry[0],
      }));

      const currentDate = new Date();
      const currentTimestamp = Math.floor(currentDate.getTime());
      const last3DaysDate = currentTimestamp - 86400 * 3 * 1000;
      const last7DaysDate = currentTimestamp - 86400 * 7 * 1000;
      const last30DaysDate = currentTimestamp - 86400 * 30 * 1000;
      const last3MonthsDate = currentTimestamp - 86400 * 30 * 3 * 1000;

      console.log(last7DaysDate, currentTimestamp);

      const filteredDataLast3Days = formattedData
        .filter((entry: { timestamp: number; playerCount: number }) => {
          const entryTimestamp = entry.timestamp;
          return entryTimestamp >= last3DaysDate && entryTimestamp <= currentTimestamp;
        })
        .map((entry: { timestamp: number; playerCount: number }) => {
          return {
            timestamp: getCustomDate(entry.timestamp / 1000),
            playerCount: entry.playerCount,
          };
        });
      const filteredDataLast7Days = formattedData
        .filter((entry: { timestamp: number; playerCount: number }) => {
          const entryTimestamp = entry.timestamp;
          return entryTimestamp >= last7DaysDate && entryTimestamp <= currentTimestamp;
        })
        .map((entry: { timestamp: number; playerCount: number }) => {
          return {
            timestamp: getCustomDate(entry.timestamp / 1000),
            playerCount: entry.playerCount,
          };
        });

      const filteredDataLast30Days = formattedData
        .filter((entry: { timestamp: number; playerCount: number }) => {
          const entryTimestamp = entry.timestamp;
          return entryTimestamp >= last30DaysDate && entryTimestamp <= currentTimestamp;
        })
        .map((entry: { timestamp: number; playerCount: number }) => {
          return {
            timestamp: getCustomDate(entry.timestamp / 1000),
            playerCount: entry.playerCount,
          };
        });

      const filteredDataLast3Months = formattedData
        .filter((entry: { timestamp: number; playerCount: number }) => {
          const entryTimestamp = entry.timestamp;
          return entryTimestamp >= last3MonthsDate && entryTimestamp <= currentTimestamp;
        })
        .map((entry: { timestamp: number; playerCount: number }) => {
          return {
            timestamp: getCustomDate(entry.timestamp / 1000),
            playerCount: entry.playerCount,
          };
        });

      const graphArray = [
        {
          function: filteredDataLast3Days,
          heading: "Player History (Last 3 Days)",
        },
        {
          function: filteredDataLast7Days,
          heading: "Player History (Last 7 Days)",
        },
        {
          function: filteredDataLast30Days,
          heading: "Player History (Last 30 Days)",
        },
        {
          function: filteredDataLast3Months,
          heading: "Player History (Last 3 Months)",
        },
      ];

      return (
        <div className="flex flex-wrap justify-center my-8">
          {graphArray.map((el) => (
            <div
              key={el.heading}
              className="m-2 text-center border border-black bg-zinc-800 rounded-2xl p-2"
            >
              <h3 className="text-xl font-bold text-gray-200 mb-4">{el.heading}</h3>
              <LineChart width={500} height={300} data={el.function}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="playerCount"
                  name="Player Count"
                  stroke="#8884d8"
                />
              </LineChart>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <BodyWrapper>
      <Head>
        <title> {data ? data.name : "Rust specific server details"}</title>
        <meta name="description" content="Rust specific server details" key="desc" />
      </Head>
      <div className="m-4 max-w-6xl flex flex-col justify-center items-center ">
        <div>
          <p>Server IP: {id}</p>
          <button onClick={() => router.back()}>Get Back</button>
        </div>
        {isLoading && (
          <main className="flex flex-wrap mt-4 justify-center items-center m-2">
            <Spinner />
            <h2 className="text-2xl font-bold mx-1 text-gray-200">
              {" "}
              Loading server details...
            </h2>
          </main>
        )}
        {error instanceof Error && <div>An error has occurred: {error.message}</div>}

        {status === "success" && (
          <main className="">
            {data && (
              <div className="max-w-6xl flex flex-col items-center ">
                <h1 className="text-2xl font-bold text-gray-200 text-center my-2 ">
                  {data.name}
                </h1>
                <article className="max-w-2xl flex flex-col border border-black bg-zinc-800 rounded-2xl p-6">
                  {/* FIRST CONTENT */}
                  <div className="flex">
                    <div className="mr-4">
                      <h2 className="text-xl font-bold text-gray-200">
                        Game Ip: {data.addr.split(":").slice(0, 1) + ":" + data.gameport}
                      </h2>
                      <p className=" text-gray-400">Query Ip: {data.addr}</p>
                      <p className="text-gray-400">Players: {data.players}</p>
                      <p className="text-gray-400">Max Players: {data.max_players}</p>
                      <p className="text-gray-400">Modded: {data.modded ? "Yes" : "No"}</p>
                      <p className="text-gray-400">Vanilla: {data.vanilla ? "Yes" : "No"}</p>
                      <p className="text-gray-400">Wipe Rotation: {data.wipe_rotation}</p>
                      <p className="text-gray-400">Last Wipe: {getCustomDate(data.born)}</p>
                      <p className="text-gray-400">
                        Next Wipe: {getCustomDate(data.born_next)}
                      </p>
                      <p className="text-gray-400">Max Group Size: {data.max_group_size}</p>
                      <p className="text-gray-400">Rate: {data.rate}</p>
                      <p className="text-gray-400">Gametype: {data.gametype?.join(", ")}</p>
                      <p className="text-gray-400">Softcore/Hardcore: {data.difficulty}</p>
                      {data.rank && <p className="text-gray-400">Score: {data.rank}</p>}
                    </div>
                    {/* LOCATION */}

                    {data.rules?.location ? (
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-200">Location</h4>
                        <p className="text-gray-400">
                          Country: {data.rules?.location?.country}
                        </p>
                        {serverLocationData?.region && (
                          <p className="text-gray-400">Region: {serverLocationData.region}</p>
                        )}
                        {serverLocationData?.city && (
                          <p className="text-gray-400">City: {serverLocationData.city}</p>
                        )}

                        <p className="text-gray-400">
                          Distance:{" "}
                          {userLocation &&
                          data.rules?.location?.latitude &&
                          data.rules?.location?.longitude
                            ? calculateDistance(
                                data.rules?.location?.latitude,
                                data.rules?.location?.longitude,
                                userLocation.latitude,
                                userLocation.longitude
                              )
                            : null}{" "}
                          km
                        </p>
                        <p className="text-gray-400">
                          Latitude: {data.rules.location.latitude}
                        </p>
                        <p className="text-gray-400">
                          Longitude: {data.rules.location.longitude}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-lg font-bold text-gray-200">Location</h4>
                        {serverLocationData?.country && (
                          <p className="text-gray-400">
                            Country: {serverLocationData.country}
                          </p>
                        )}
                        {serverLocationData?.region && (
                          <p className="text-gray-400">Region: {serverLocationData.region}</p>
                        )}
                        {serverLocationData?.city && (
                          <p className="text-gray-400">City: {serverLocationData.city}</p>
                        )}
                        {serverLocationData?.latitude &&
                          serverLocationData?.longitude &&
                          userLocation && (
                            <p className="text-gray-400">
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
                        {serverLocationData?.latitude && (
                          <p className="text-gray-400">
                            Latitude: {serverLocationData.latitude}
                          </p>
                        )}
                        {serverLocationData?.longitude && (
                          <p className="text-gray-400">
                            Longitude: {serverLocationData.longitude}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  {/* DESCRIPTION */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-gray-200">Description</h3>
                    <p className="text-gray-400">Description: {data.rules?.description}</p>
                    {/* <p className="text-gray-400">FPS Average: {data.rules?.fps_avg}</p> */}
                    <p className="text-gray-400">Seed: {data.rules?.seed}</p>
                    <p className="text-gray-400">Size: {data.rules?.size}</p>

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
                    <p className="text-gray-400">
                      Uptime: {getTimeUptime(data.rules?.uptime)}
                    </p>
                  </div>
                </article>
                {data.players_history && <article>{renderPlayerHistoryGraph()}</article>}
              </div>
            )}
          </main>
        )}
      </div>
    </BodyWrapper>
  );
};

export default ServerDetailsPage;
