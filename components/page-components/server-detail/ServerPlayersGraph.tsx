"use client";

import React, { useEffect, useMemo, useState } from "react";
// import dynamic from "next/dynamic";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { calculateGraph } from "@/utils/calculateGraph";
// const AreaChart = dynamic(() => import("recharts/es6/chart/AreaChart"), { ssr: false });
// const Area = dynamic(() => import("recharts/es6/cartesian/Area"), { ssr: false });
// const XAxis = dynamic(() => import("recharts/es6/cartesian/XAxis"), { ssr: false });

// const Area = dynamic(() => import("recharts/es6/cartesian/Area").then((mod) => mod.Area), {
//   ssr: false,
// });

type PlayersHistory = [number, number][];

interface TServerGraphs {
  players_history: PlayersHistory | null;
  isFetching?: Boolean;
}

const loadingGraph = (
  <section className="flex flex-wrap justify-center my-8">
    {Array.from({ length: 4 }).map((_, index) => (
      <article
        key={index}
        className={`flex flex-col text-center items-center m-2 border border-black bg-zinc-800 rounded-2xl p-2 ${
          index < 2 ? "sm:w-[525px]" : "xl:w-[1065px]"
        } sm:w-[525px]  h-[350px] w-[325px]`}
      >
        <h3 className="text-xl font-bold text-gray-200 my-2">Loading...</h3>
        <div className="bg-zinc-600 animate-pulse rounded-md w-[95%] h-[80%]"></div>
      </article>
    ))}
  </section>
);

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

const ServerPlayersGraph: React.FC<TServerGraphs> = ({ players_history, isFetching }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  // const graphArrayInput = useMemo(() => {
  //   if (players_history && isMounted) {
  //     return calculateGraph(players_history);
  //   }
  //   return null;
  // }, [players_history]);
  
  const graphArrayInput = players_history && isMounted ? calculateGraph(players_history) : null;

  let mountedGraph;

  if (graphArrayInput) {
    mountedGraph = (
      <section className="flex flex-wrap justify-center my-8">
        {graphArrayInput.map((el, index) => (
          <article
            key={el.graphHeading}
            className={`sm:m-2 my-2 mx-0 text-center border border-black bg-zinc-800 rounded-2xl p-2 ${el.graphWidth} sm:w-[525px] w-[325px] h-[350px]`}
          >
            <h3 className="text-xl font-bold text-gray-200 my-2">{el.graphHeading}</h3>
            <div className="w-full h-72">
              <ResponsiveContainer width={"100%"} height={"100%"} minWidth={"0"}>
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
                  {index <= 2 ? customAreaSingle : customAreaStacked}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>
        ))}
      </section>
    );
  }
  return !isFetching && graphArrayInput ? mountedGraph : loadingGraph;
};

export default ServerPlayersGraph;
