import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getCustomShortDate } from "@/utils/timeFunctions";

type PlayersHistory = [number, number][];

interface TServerGraphs {
  players_history: PlayersHistory;
  isSSG?: Boolean;
}

const ServerGraphs: React.FC<TServerGraphs> = ({ players_history, isSSG }) => {
  // let chartWidth = 1000;
  // let chartWidthSm = 500;

  // const MOBILE_WIDTH_THRESHOLD = 640;
  // const isMobile = typeof window !== "undefined" && window.innerWidth < MOBILE_WIDTH_THRESHOLD;

  // if (isMobile) {
  //   chartWidth = 300;
  //   chartWidthSm = 300;
  // }

  if (players_history) {
    const formattedData = players_history.map((entry: number[]) => ({
      timestamp: entry[1],
      playerCount: entry[0],
    }));

    const currentDate = new Date();
    const currentTimestamp = Math.floor(currentDate.getTime());
    const last3DaysDate = currentTimestamp - 86400 * 3 * 1000;
    const last7DaysDate = currentTimestamp - 86400 * 7 * 1000;
    const last30DaysDate = currentTimestamp - 86400 * 30 * 1000;

    const filteredDataLast3Days = formattedData
      .filter((entry: { timestamp: number; playerCount: number }) => {
        const entryTimestamp = entry.timestamp;
        return entryTimestamp >= last3DaysDate && entryTimestamp <= currentTimestamp;
      })
      .map((entry: { timestamp: number; playerCount: number }) => {
        return {
          timestamp: getCustomShortDate(entry.timestamp / 1000),
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
          timestamp: getCustomShortDate(entry.timestamp / 1000),
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
          timestamp: getCustomShortDate(entry.timestamp / 1000),
          playerCount: entry.playerCount,
        };
      });

    // Filtered by backend, there are no more than 3 months of data
    const filteredDataLast3Months = formattedData.map(
      (entry: { timestamp: number; playerCount: number }) => {
        return {
          timestamp: getCustomShortDate(entry.timestamp / 1000),
          playerCount: entry.playerCount,
        };
      }
    );

    const graphArrayInput = [
      {
        function: filteredDataLast3Days,
        heading: "Player History - Last 3 days (hourly)",
      },
      {
        function: filteredDataLast7Days,
        heading: "Player History - Last 7 days (hourly)",
      },
      {
        function: filteredDataLast30Days,
        heading: "Player History - Last 30 days (hourly)",
      },
      {
        function: filteredDataLast3Months,
        heading: "Player History - Last 3 Months (daily)",
      },
    ];

    const customStackedAreaChart = (
      <article
        className={`sm:m-2 my-2 mx-0 text-center border border-black bg-zinc-800 rounded-2xl p-2 sm:w-[525px] w-[325px] h-[350px]`}
      >
        <h3 className="text-xl font-bold text-gray-200 mb-4">
          Player History - Last 3 Months (daily)
        </h3>
        <div className="w-full sm:h-72 h-64">
          <ResponsiveContainer>
            <AreaChart
              data={filteredDataLast3Months}
              margin={{
                top: 10,
                right: 5,
                left: -5,
                bottom: 0,
              }}
            >
              <XAxis
                ticks={[
                  filteredDataLast3Months[0]?.timestamp,
                  filteredDataLast3Months[filteredDataLast3Months.length - 1]?.timestamp,
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
                name="Hourly Player Count"
                stroke="#e07965"
                fill="#e07965"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>
    );

    return (
      <section className="flex flex-wrap justify-center my-8">
        {graphArrayInput.map((el) => (
          <article
            key={el.heading}
            className={`sm:m-2 my-2 mx-0 text-center border border-black bg-zinc-800 rounded-2xl p-2 sm:w-[525px] w-[325px] h-[350px]`}
          >
            <h3 className="text-xl font-bold text-gray-200 mb-4">{el.heading}</h3>
            <div className="w-full sm:h-72 h-64">
              <ResponsiveContainer>
                <AreaChart
                  data={el.function}
                  margin={{
                    top: 10,
                    right: 5,
                    left: -5,
                    bottom: 0,
                  }}
                >
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
                    name="Hourly Player Count"
                    stroke="#e07965"
                    fill="#e07965"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>
        ))}
        {customStackedAreaChart}
      </section>
    );
  }
  return null;
};
export default ServerGraphs;
