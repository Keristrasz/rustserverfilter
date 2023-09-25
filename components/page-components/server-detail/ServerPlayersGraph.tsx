import React from "react";
// import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { getCustomShortDate } from "@/utils/timeFunctions";
import TestChart from "./TestChart";
import HeatMap from "./HeatMap";

type PlayersHistory = [number, number][];

interface TServerGraphs {
  players_history: PlayersHistory;
  isSSG?: Boolean;
}

const ServerGraphs: React.FC<TServerGraphs> = ({ players_history, isSSG }) => {
  let chartWidth = "600";
  let chartHeight = "350";

  const MOBILE_WIDTH_THRESHOLD = 640;
  const isMobile = typeof window !== "undefined" && window.innerWidth < MOBILE_WIDTH_THRESHOLD;

  if (isMobile) {
    chartWidth = "300";
    chartHeight = "350";
  }

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
    const last3MonthsDate = currentTimestamp - 86400 * 30 * 3 * 1000;

    const filteredDataLast3Days = formattedData
      .filter((entry: { timestamp: number; playerCount: number }) => {
        const entryTimestamp = entry.timestamp;
        return entryTimestamp >= last3DaysDate && entryTimestamp <= currentTimestamp;
      })
      .reduce(
        (result, entry) => {
          result.timestamp.push(getCustomShortDate(entry.timestamp / 1000));
          result.playerCount.push(entry.playerCount);
          return result;
        },
        { timestamp: [], playerCount: [] }
      );
    const filteredDataLast7Days = formattedData
      .filter((entry: { timestamp: number; playerCount: number }) => {
        const entryTimestamp = entry.timestamp;
        return entryTimestamp >= last7DaysDate && entryTimestamp <= currentTimestamp;
      })
      .reduce(
        (result, entry) => {
          result.timestamp.push(getCustomShortDate(entry.timestamp / 1000));
          result.playerCount.push(entry.playerCount);
          return result;
        },
        { timestamp: [], playerCount: [] }
      );

    const filteredDataLast30Days = formattedData
      .filter((entry: { timestamp: number; playerCount: number }) => {
        const entryTimestamp = entry.timestamp;
        return entryTimestamp >= last30DaysDate && entryTimestamp <= currentTimestamp;
      })
      .reduce(
        (result, entry) => {
          result.timestamp.push(getCustomShortDate(entry.timestamp / 1000));
          result.playerCount.push(entry.playerCount);
          return result;
        },
        { timestamp: [], playerCount: [] }
      );

    // const filteredDataLast3Months = formattedData.reduce((result, entry) => {
    //   const entryTimestamp = entry.timestamp;
    //   const playerCount = entry.playerCount;

    //   if (entryTimestamp >= last3MonthsDate && entryTimestamp <= currentTimestamp) {
    //     result[entryTimestamp] = playerCount;
    //   }

    //   return result;
    // }, {});

    // Assuming you have the data in 'formattedData', 'last3MonthsDate', and 'currentTimestamp'

    // Filter the data to the last 3 months
    const filteredDataLast3Months = formattedData.filter((entry) => {
      const entryTimestamp = entry.timestamp;
      return entryTimestamp >= last3MonthsDate && entryTimestamp <= currentTimestamp;
    });

    // Initialize an object to store the daily averages
    const dailyAveragesLast3Months = {};

    // Calculate daily averages
    filteredDataLast3Months.forEach((entry) => {
      const entryTimestamp = entry.timestamp;
      const playerCount = entry.playerCount;
      const entryDate = new Date(entryTimestamp).toLocaleDateString();

      if (!dailyAveragesLast3Months[entryDate]) {
        dailyAveragesLast3Months[entryDate] = {
          sum: 0,
          count: 0,
        };
      }

      dailyAveragesLast3Months[entryDate].sum += playerCount;
      dailyAveragesLast3Months[entryDate].count++;
    });

    console.log(dailyAveragesLast3Months);
    // Calculate daily averages for the last 3 months and store in an object with timestamps as keys
    const dailyAveragesObject = {};

    for (const day in dailyAveragesLast3Months) {
      const { sum, count } = dailyAveragesLast3Months[day];
      const dailyAverage = Math.ceil(sum / count);
      const timestamp = new Date(day).getTime() / 1000;
      dailyAveragesObject[timestamp] = dailyAverage;
    }

    console.log("Daily Averages for Last 3 Months (90 days):");
    console.log(dailyAveragesObject);

    const graphArrayInput = [
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
        function: dailyAveragesObject,
        heading: "Player History (Last 3 Months)",
      },
    ];

    return isSSG ? (
      <section className="flex flex-wrap justify-center my-8">
        {graphArrayInput.map((el, index) => (
          <article
            key={el.heading}
            className={`m-2 text-center border border-black bg-zinc-800 rounded-2xl p-2 h-[300px] w-[550px]`}
          >
            <h3 className="text-xl font-bold text-gray-200 mb-4">{el.heading}</h3>
            {/* {isSSG && <TestChart X={formattedDataTestX} Y={formattedDataTestY} />} */}

            {index !== 3 ? (
              <TestChart X={el.function.timestamp} Y={el.function.playerCount} />
            ) : (
              <HeatMap data={el.function} />
            )}
          </article>
        ))}
      </section>
    ) : null;
  }
  return null;
};
export default ServerGraphs;
