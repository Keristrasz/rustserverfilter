import React from "react";
import { getCustomDate } from "@/utils/inputFunctions";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";
type PlayersHistory = [number, number][];
function ServerGraphs({ players_history }: { players_history: PlayersHistory }) {
  if (players_history) {
    players_history;
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
            <AreaChart width={500} height={300} data={el.function}>
              <XAxis
                ticks={[
                  el.function[0]?.timestamp,
                  el.function[el.function.length - 1]?.timestamp,
                ]}
                dataKey="timestamp"
                tick={{ fill: "#ccc" }}
                axisLine={{ stroke: "#ccc" }}
                tickLine={{ stroke: "#ccc" }}
              />
              <YAxis
                tick={{ fill: "#ccc" }}
                axisLine={{ stroke: "#ccc" }}
                tickLine={{ stroke: "#ccc" }}
              />
              <Tooltip
                labelStyle={{ color: "#fff" }}
                contentStyle={{
                  background: "#363636",
                  color: "#FFFFFF",
                  border: "1px solid #000000",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="playerCount"
                name="Player Count"
                stroke="#d44024"
                fill="#d44024"
                isAnimationActive={false}
              />
            </AreaChart>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default ServerGraphs;
