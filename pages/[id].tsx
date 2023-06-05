import React from "react";
import { useRouter } from "next/router";
import useCustomSingleQuery from "@/hooks/useCustomSingleQuery";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Spinner from "@/components/Spinner";
import { getCustomDate } from "@/utils/inputFunctions";

const ServerDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error, status } = useCustomSingleQuery(id as string);

  // const renderPlayerHistoryGraph = () => {
  //   if (data && data.players_history) {
  //     const formattedData = data.players_history.map((entry: number[]) => ({
  //       timestamp: getTime(entry[1] / 1000),
  //       playerCount: entry[0],
  //     }));

  //     return (
  //       <LineChart width={500} height={300} data={formattedData}>
  //         <XAxis dataKey="timestamp" />
  //         <YAxis />
  //         <Tooltip />
  //         <Legend />
  //         <Line type="monotone" dataKey="playerCount" name="Player Count" stroke="#8884d8" />
  //       </LineChart>
  //     );
  //   }
  //   return null;
  // };

  const renderPlayerHistoryGraph = () => {
    if (data && data.players_history) {
      console.log(data.players_history);
      const formattedData = data.players_history.map((entry: Number[]) => ({
        timestamp: entry[1],
        playerCount: entry[0],
      }));

      const currentDate = new Date();
      const currentTimestamp = Math.floor(currentDate.getTime());
      const last7DaysDate = currentTimestamp - 86400 * 7 * 1000;
      const last30DaysDate = currentTimestamp - 86400 * 31 * 1000;
      const last3MonthsDate = currentTimestamp - 86400 * 31 * 3 * 1000;

      console.log(last7DaysDate, currentTimestamp);

      // const filteredData = formattedData.filter((entry) => {
      //   const entryTimestamp = entry.timestamp;
      //   entryTimestamp >= last7DaysDate && entryTimestamp <= currentTimestamp
      //     ? getCustomDate(entryTimestamp / 1000)
      //     : null;
      // });

      const filteredData = formattedData
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

      console.log(filteredData, filteredDataLast30Days, filteredDataLast3Months);

      return (
        <div>
          <h3 className="text-xl font-bold text-gray-200">Player History (Last 7 Days)</h3>
          <LineChart width={500} height={300} data={filteredData}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="playerCount" name="Player Count" stroke="#8884d8" />
          </LineChart>

          <h3 className="text-xl font-bold text-gray-200">Player History (Last 30 Days)</h3>
          <LineChart width={500} height={300} data={filteredDataLast30Days}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="playerCount" name="Player Count" stroke="#8884d8" />
          </LineChart>

          <h3 className="text-xl font-bold text-gray-200">Player History (Last 3 Months)</h3>
          <LineChart width={500} height={300} data={filteredDataLast3Months}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="playerCount" name="Player Count" stroke="#8884d8" />
          </LineChart>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Server Details</h1>
      <p>Server IP: {id}</p>
      <button onClick={() => router.back()}>Get Back</button>

      {isLoading && (
        <div className="flex flex-wrap mt-4 items-center">
          <Spinner />
          <h2 className="text-2xl font-bold mx-1 text-gray-200"> Loading server details...</h2>
        </div>
      )}

      {error instanceof Error && <div>An error has occurred: {error.message}</div>}

      {status === "success" && (
        <div className="m-4 max-w-6xl">
          {data && (
            <div>
              <h2 className="text-2xl font-bold text-gray-200">{data.name}</h2>
              <h3 className="text-xl font-bold text-gray-200">
                Game Ip: {data.addr.split(":").slice(0, 1) + ":" + data.gameport}
              </h3>
              <p className=" text-gray-400">Query Ip: {data.addr}</p>
              {/* <p className="text-gray-400">Gameport: {data.gameport}</p> */}
              <p className="text-gray-400">Players: {data.players}</p>
              <p className="text-gray-400">Max Players: {data.max_players}</p>
              <p className="text-gray-400">Modded: {data.modded ? "Yes" : "No"}</p>
              <p className="text-gray-400">Vanilla: {data.vanilla ? "Yes" : "No"}</p>
              <p className="text-gray-400">Wipe Rotation: {data.wipe_rotation}</p>
              <p className="text-gray-400">Born: {data.born}</p>
              <p className="text-gray-400">Born Next: {data.born_next}</p>
              <p className="text-gray-400">Max Group Size: {data.max_group_size}</p>
              <p className="text-gray-400">Rate: {data.rate}</p>
              {data.gametype && (
                <p className="text-gray-400">Gametype: {data.gametype.join(", ")}</p>
              )}
              <p className="text-gray-400">Difficulty: {data.difficulty}</p>
              {data.rank && <p className="text-gray-400">Rank: {data.rank}</p>}

              {data.rules && (
                <div>
                  <h3 className="text-xl font-bold text-gray-200">Description</h3>
                  <p className="text-gray-400">Description: {data.rules.description}</p>
                  <p className="text-gray-400">FPS Average: {data.rules.fps_avg}</p>
                  <p className="text-gray-400">Seed: {data.rules.seed}</p>
                  <p className="text-gray-400">Size: {data.rules.size}</p>
                  <p className="text-gray-400">URL: {data.rules.url}</p>
                  <p className="text-gray-400">Uptime: {data.rules.uptime}</p>
                  {data.rules.location && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-200">Location</h4>
                      <p className="text-gray-400">Latitude: {data.rules.location.latitude}</p>
                      <p className="text-gray-400">
                        Longitude: {data.rules.location.longitude}
                      </p>
                      <p className="text-gray-400">Country: {data.rules.location.country}</p>
                    </div>
                  )}
                </div>
              )}

              {data.players_history && (
                <div>
                  <h3 className="text-xl font-bold text-gray-200">Player History</h3>
                  {renderPlayerHistoryGraph()}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServerDetailsPage;
