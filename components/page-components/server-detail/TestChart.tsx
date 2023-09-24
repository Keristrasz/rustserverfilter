import React, { useRef } from "react";
import dynamic from "next/dynamic";

const ReactFrappeChart = dynamic(import("react-frappe-charts"), { ssr: false });
// import ReactFrappeChart from "react-frappe-charts";

const TestChart = ({ X, Y }) => {
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
        // ref={chartRef}
        type="line"
        colors={["#21ba45"]}
        axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
        lineOptions={{ hideDots: 1, regionFill: 1 }}
        animate={1}
        // height={250}
        data={{
          labels: X,
          datasets: [{ values: Y }],
        }}
      />
      {/* <button onClick={exportChart} type="button">
        Export
      </button> */}
    </div>
  );
};

export default TestChart;
