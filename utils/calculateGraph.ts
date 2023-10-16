type PlayersHistory = [number, number][];

interface ObjectPushedIntoArray {
  sum: number;
  count: number;
  min: number;
  max: number;
  date?: string;
  average?: number;
}

import { match } from "assert";
import { getHowMuchAgo, getCustomShortDate } from "./timeFunctions";

export const calculateGraph = (players_history: PlayersHistory) => {
  const formattedData = players_history.map((entry: number[]) => ({
    timestamp: entry[1],
    playerCount: entry[0],
  }));

  const currentDate = new Date();
  const currentTimestamp = Math.floor(currentDate.getTime());

  const last1DayDate = currentTimestamp - 60 * 60 * 24 * 1 * 1000;
  const last7DaysDate = currentTimestamp - 60 * 60 * 24 * 7 * 1000;
  const last30DaysDate = currentTimestamp - 86400 * 30 * 1000;
  const last90DaysDate = currentTimestamp - 86400 * 90 * 1000;

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

  let templateDataLast1Day = [];
  let templateDataLast7Days = [];
  let templateDataLast30Days = [];
  let templateDataLast0Days = [];

  // Calculate the nearest past hour at XX:30
  const currentHourWith30Minutes = new Date();
  currentHourWith30Minutes.setMinutes(30, 0, 0);

  for (let i = 0; i < 24; i++) {
    const date = getHowMuchAgo(currentHourWith30Minutes.getTime() / 1000);
    const matchingEntry = filteredDataLast1Day.find((el) => el.date === date);
    const matchingDate = matchingEntry?.playerCount;
    templateDataLast1Day.unshift({
      date,
      playerCount: matchingDate ? matchingDate : 0,
    });

    // Subtract 1 hour to move to the previous XX:30 timestamp
    currentHourWith30Minutes.setTime(currentHourWith30Minutes.getTime() - 60 * 60 * 1000);
  }

  console.log(templateDataLast1Day);

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

  for (let i = 0; i < 24 * 7; i++) {
    const date = getCustomShortDate(currentHourWith30Minutes.getTime() / 1000);
    const matchingEntry = filteredDataLast7Days.find((el) => el.date === date);
    const matchingDate = matchingEntry?.playerCount;
    templateDataLast7Days.unshift({
      date,
      playerCount: matchingDate ? matchingDate : 0,
    });

    // Subtract 1 hour to move to the previous XX:30 timestamp
    currentHourWith30Minutes.setTime(currentHourWith30Minutes.getTime() - 60 * 60 * 1000);
  }

  console.log(templateDataLast7Days);

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

  for (let i = 0; i < 24 * 30; i++) {
    const date = getCustomShortDate(currentHourWith30Minutes.getTime() / 1000);
    const matchingEntry = filteredDataLast30Days.find((el) => el.date === date);
    const matchingDate = matchingEntry?.playerCount;
    templateDataLast30Days.unshift({
      date,
      playerCount: matchingDate ? matchingDate : 0,
    });

    // Subtract 1 hour to move to the previous XX:30 timestamp
    currentHourWith30Minutes.setTime(currentHourWith30Minutes.getTime() - 60 * 60 * 1000);
  }

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

  for (let i = 0; i < 24 * 30; i++) {
    const date = getCustomShortDate(currentHourWith30Minutes.getTime() / 1000);
    const matchingEntry = filteredDataLast30Days.find((el) => el.date === date);
    const matchingDate = matchingEntry?.playerCount;
    templateDataLast30Days.unshift({
      date,
      playerCount: matchingDate ? matchingDate : 0,
    });

    // Subtract 1 hour to move to the previous XX:30 timestamp
    currentHourWith30Minutes.setTime(currentHourWith30Minutes.getTime() - 60 * 60 * 1000);
  }

  const graphArrayInput = [
    {
      graphData: templateDataLast1Day,
      graphHeading: "Player History - Last 24 hours",
      graphWidth: "",
    },
    {
      graphData: templateDataLast7Days,
      graphHeading: "Player History - Last 7 days",
      graphWidth: "",
    },
    {
      graphData: templateDataLast30Days,
      graphHeading: "Player History - Last 30 days",
      graphWidth: "xl:w-[1065px]",
    },
    {
      graphData: dailyAveragesLast3Months,
      graphHeading: "Player History - Last 3 Months",
      graphWidth: "xl:w-[1065px]",
    },
  ];

  return graphArrayInput;
};
