import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getCustomShortDate } from "@/utils/timeFunctions";

type PlayersHistory = [number, number][];

interface ObjectPushedIntoArray {
  sum: number;
  count: number;
  min: number;
  max: number;
  timestamp?: string; // Make the timestamp property optional
  average?: number;
}

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
          timestamp: getCustomShortDate(entry.timestamp / 1000, true),
          playerCount: entry.playerCount,
        };
      }
    );

    let dailyAveragesLast3Months = [];
    let objectPushedIntoArray: ObjectPushedIntoArray | null = null; // Initialize as null
    // let objectPushedIntoArray: ObjectPushedIntoArray = {
    //   sum: 0,
    //   count: 0,
    //   min: 0,
    //   max: 0,
    // };

    // Calculate daily averages
    filteredDataLast3Months.map((entry, index) => {
      const entryTimestamp = entry.timestamp;
      const playerCount = entry.playerCount;
      // convert timestamp to the DAY only, so there can be only 24 values
      // const entryDate = new Date(entryTimestamp).toISOString().split("T")[0];

      // Check if objectPushedIntoArray should be initialized or updated
      if (
        objectPushedIntoArray === null ||
        objectPushedIntoArray.timestamp !== entryTimestamp
      ) {
        if (objectPushedIntoArray !== null) {
          // Calculate and add the average
          objectPushedIntoArray.average = Math.ceil(
            objectPushedIntoArray.sum / objectPushedIntoArray.count
          );
          // Push the previous objectPushedIntoArray if it's not the first iteration
          dailyAveragesLast3Months.push(objectPushedIntoArray);
        }

        // Initialize a new objectPushedIntoArray
        objectPushedIntoArray = {
          sum: playerCount,
          count: 1,
          min: playerCount,
          max: playerCount,
          timestamp: entryTimestamp,
        };
      } else {
        // Update the existing objectPushedIntoArray
        objectPushedIntoArray.sum += playerCount;
        objectPushedIntoArray.count++;
        if (playerCount < objectPushedIntoArray.min || objectPushedIntoArray.min === 0) {
          objectPushedIntoArray.min = playerCount;
        }
        if (playerCount > objectPushedIntoArray.max) {
          objectPushedIntoArray.max = playerCount;
        }
      }

      // Push the final objectPushedIntoArray if it's the last iteration
      if (index === filteredDataLast3Months.length - 1) {
        dailyAveragesLast3Months.push(objectPushedIntoArray);
      }
    });

    console.log(dailyAveragesLast3Months);

    // // Calculate daily averages for the last 3 months and store in an object with timestamps as keys
    // const dailyAveragesObject = {};

    // for (const day in dailyAveragesLast3Months) {
    //   const { sum, count } = dailyAveragesLast3Months[day];
    //   const dailyAverage = Math.ceil(sum / count);
    //   const timestamp = new Date(day).getTime() / 1000;
    //   dailyAveragesObject[timestamp] = dailyAverage;
    // }

    // console.log("Daily Averages for Last 3 Months (90 days):");
    // console.log(dailyAveragesObject);

    // const timestampsLast3Months = Object.keys(data);
    // const startTimestamp = parseInt(timestampsLast3Months[0]);
    // const endTimestamp = timestampsLast3Months[timestampsLast3Months.length - 1];
    // const startDate = new Date(startTimestamp * 1000);
    // const endDate = new Date(
    //   parseInt(timestampsLast3Months[timestampsLast3Months.length - 1] * 1000)
    // );

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
      // {
      //   function: filteredDataLast3Months,
      //   heading: "Player History - Last 3 Months (daily)",
      // },
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
              data={dailyAveragesLast3Months}
              margin={{
                top: 10,
                right: 5,
                left: -5,
                bottom: 0,
              }}
            >
              <XAxis
                ticks={[
                  dailyAveragesLast3Months[0]?.timestamp,
                  dailyAveragesLast3Months[dailyAveragesLast3Months.length - 1]
                    ?.timestamp,
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
                dataKey="average"
                name="Average"
                stroke="#FFFF00"
                fill="#FFFF00"
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="min"
                name="Min"
                stroke="#008000"
                fill="#008000"
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="max"
                name="Max"
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
                    interval={0}
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
