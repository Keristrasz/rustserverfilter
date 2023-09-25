import React, { useRef } from "react";
import dynamic from "next/dynamic";

const ReactFrappeChart = dynamic(import("react-frappe-charts"), { ssr: false });
// import ReactFrappeChart from "react-frappe-charts";

const HeatMap = ({ data }) => {
  const timestampsLast3Months = Object.keys(data);
  const startTimestamp = parseInt(timestampsLast3Months[0]);
  const endTimestamp = timestampsLast3Months[timestampsLast3Months.length - 1];
  const startDate = new Date(startTimestamp * 1000);
  const endDate = new Date(
    parseInt(timestampsLast3Months[timestampsLast3Months.length - 1] * 1000)
  );
  console.log("startts" + startTimestamp);
  console.log(data);
  console.log(timestampsLast3Months[timestampsLast3Months.length - 1]);
  console.log(startDate, endDate);
  console.log(endDate);

  // console.log(X);
  //   const chartRef = useRef();

  //   const exportChart = () => {
  //     if (chartRef && chartRef.current) {
  //       chartRef.current.export();
  //     }
  //   };

  return (
    <div>
      <ReactFrappeChart
        type="heatmap"
        data={{
          dataPoints: data,
          start: startDate, // a JS date object
          end: endDate,
        }}
        radius="2"
        // spaceRatio="10"
      />
    </div>
  );
};

export default HeatMap;