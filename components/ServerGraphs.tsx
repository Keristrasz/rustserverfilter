import React from "react";
import { getCustomDate } from "@/utils/inputFunctions";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
type PlayersHistory = [number, number][];
function ServerGraphs({ players_history }: { players_history: PlayersHistory }) {
  if (players_history) {
    console.log(players_history);
    const formattedData = players_history.map((entry: number[]) => ({
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
                isAnimationActive={false}
              />
            </LineChart>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default ServerGraphs;
