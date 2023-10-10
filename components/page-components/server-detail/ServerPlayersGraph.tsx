import React from "react";
// import dynamic from "next/dynamic";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
// const { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } = dynamic(
//   () => import("recharts"),
//   { ssr: false }
// );

// const AreaChart = dynamic(() => import("recharts/es6/chart/AreaChart"), { ssr: false });
// const Area = dynamic(() => import("recharts/es6/cartesian/Area"), { ssr: false });
// const XAxis = dynamic(() => import("recharts/es6/cartesian/XAxis"), { ssr: false });
// const YAxis = dynamic(() => import("recharts/es6/cartesian/YAxis"), { ssr: false });
// const Tooltip = dynamic(() => import("recharts/es6/component/Tooltip"), { ssr: false });
// const Legend = dynamic(() => import("recharts/es6/component/Legend"), { ssr: false });
// const ResponsiveContainer = dynamic(
//   () => import("recharts/es6/component/ResponsiveContainer"),
//   { ssr: false }
// );

// const AreaChart = dynamic(
//   () => import("recharts/es6/chart/AreaChart").then((mod) => mod.AreaChart),
//   {
//     ssr: false,
//   }
// );
// const Area = dynamic(() => import("recharts/es6/cartesian/Area").then((mod) => mod.Area), {
//   ssr: false,
// });
// const XAxis = dynamic(() => import("recharts/es6/cartesian/XAxis").then((mod) => mod.XAxis), {
//   ssr: false,
// });
// const YAxis = dynamic(() => import("recharts/es6/cartesian/YAxis").then((mod) => mod.YAxis), {
//   ssr: false,
// });
// const Tooltip = dynamic(
//   () => import("recharts/es6/component/Tooltip").then((mod) => mod.Tooltip),
//   {
//     ssr: false,
//   }
// );
// const Legend = dynamic(
//   () => import("recharts/es6/component/Legend").then((mod) => mod.Legend),
//   {
//     ssr: false,
//   }
// );
// const ResponsiveContainer = dynamic(
//   () =>
//     import("recharts/es6/component/ResponsiveContainer").then(
//       (mod) => mod.ResponsiveContainer
//     ),
//   {
//     ssr: false,
//   }
// );

import { getCustomShortDate, getHowMuchAgo } from "@/utils/timeFunctions";

type PlayersHistory = [number, number][];

interface ObjectPushedIntoArray {
  sum: number;
  count: number;
  min: number;
  max: number;
  date?: string;
  average?: number;
}

interface TServerGraphs {
  players_history: PlayersHistory;
  isSSG?: Boolean;
}

const ServerPlayersGraph: React.FC<TServerGraphs> = ({ players_history, isSSG }) => {
  if (players_history) {
    const formattedData = players_history.map((entry: number[]) => ({
      timestamp: entry[1],
      playerCount: entry[0],
    }));

    const currentDate = new Date();
    const currentTimestamp = Math.floor(currentDate.getTime());
    const last1DayDate = currentTimestamp - 86400 * 1 * 1000;
    const last7DaysDate = currentTimestamp - 86400 * 7 * 1000;
    const last30DaysDate = currentTimestamp - 86400 * 30 * 1000;

    const filteredDataLast1Day = formattedData
      .filter((entry: { timestamp: number; playerCount: number }) => {
        const entryTimestamp = entry.timestamp;
        return entryTimestamp >= last1DayDate && entryTimestamp <= currentTimestamp;
      })
      .map((entry: { timestamp: number; playerCount: number }) => {
        return {
          date: getHowMuchAgo(entry.timestamp / 1000),
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
          date: getCustomShortDate(entry.timestamp / 1000),
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
          date: getCustomShortDate(entry.timestamp / 1000),
          playerCount: entry.playerCount,
        };
      });

    // Filtered by backend, there are no more than 3 months of data
    const filteredDataLast3Months = formattedData.map(
      (entry: { timestamp: number; playerCount: number }) => {
        return {
          timestamp: getCustomShortDate(entry.timestamp / 1000, "day-date"),
          playerCount: entry.playerCount,
        };
      }
    );

    let dailyAveragesLast3Months: ObjectPushedIntoArray[] = [];
    let objectPushedIntoArray: ObjectPushedIntoArray | null = null; // Initialize as null

    // Calculate daily averages
    filteredDataLast3Months.map((entry, index) => {
      const entryTimestamp = entry.timestamp;
      const playerCount = entry.playerCount;
      // convert timestamp to the DAY only, so there can be only 24 values
      // Check if objectPushedIntoArray should be initialized or updated
      if (objectPushedIntoArray === null || objectPushedIntoArray.date !== entryTimestamp) {
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
          date: entryTimestamp,
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
        objectPushedIntoArray.average = Math.ceil(
          objectPushedIntoArray.sum / objectPushedIntoArray.count
        );
        dailyAveragesLast3Months.push(objectPushedIntoArray);
      }
    });

    const graphArrayInput = [
      {
        graphData: filteredDataLast1Day,
        graphHeading: "Player History - Last 24 hours",
        graphWidth: "",
      },
      {
        graphData: filteredDataLast7Days,
        graphHeading: "Player History - Last 7 days",
        graphWidth: "",
      },
      {
        graphData: filteredDataLast30Days,
        graphHeading: "Player History - Last 30 days",
        graphWidth: "xl:w-[1065px]",
      },
      {
        graphData: dailyAveragesLast3Months,
        graphHeading: "Player History - Last 3 Months",
        graphWidth: "xl:w-[1065px]",
      },
    ];

    const customAreaSingle = (
      <Area
        type="monotone"
        dataKey="playerCount"
        name="Player Count"
        stroke="#e07965"
        fill="#e07965"
        isAnimationActive={false}
      />
    );

    const customAreaStacked = (
      <>
        <Area
          type="monotone"
          dataKey="max"
          name="Max"
          stroke="#e07965"
          fill="#e07965"
          isAnimationActive={false}
        />
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
          stroke="#16a34a"
          fill="#16a34a"
          isAnimationActive={false}
        />
      </>
    );

    return (
      <section className="flex flex-wrap justify-center my-8">
        {graphArrayInput.map((el, index) => (
          <article
            key={el.graphHeading}
            className={`sm:m-2 my-2 mx-0 text-center border border-black bg-zinc-800 rounded-2xl p-2 ${el.graphWidth} sm:w-[525px] w-[325px] h-[350px]`}
          >
            <h3 className="text-xl font-bold text-gray-200 my-2">{el.graphHeading}</h3>
            <div className="w-full h-72">
              <ResponsiveContainer>
                <AreaChart
                  data={el.graphData}
                  margin={{
                    top: 10,
                    right: 5,
                    left: -15,
                    bottom: 0,
                  }}
                >
                  <XAxis
                    ticks={[
                      el.graphData[Math.floor(el.graphData.length / 7)]?.date!,
                      el.graphData[Math.floor(el.graphData.length / 2)]?.date!,
                      el.graphData[Math.floor(el.graphData.length - el.graphData.length / 7)]
                        ?.date!,
                    ]}
                    dataKey="date"
                    axisLine={{ stroke: "#ccc" }}
                    tickLine={{ stroke: "#ccc" }}
                    tick={{ fill: "#ccc" }}
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
                  <Legend
                    wrapperStyle={{ marginLeft: "25px" }} // Move the legend to the right by 20 pixels
                  />
                  {index! <= 2 ? customAreaSingle : customAreaStacked}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>
        ))}
      </section>
    );
  }
  return null;
};
export default ServerPlayersGraph;
