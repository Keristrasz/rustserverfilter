"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { calculateDistance, getTime, getTimeUptime } from "@/utils/inputFunctions";
import { FilterType, SorterType } from "@/utils/typesTypescript";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useCustomInfiniteQuery from "@/hooks/useCustomInfiniteQuery";
import { useInView } from "react-intersection-observer";

interface ResultsTableProps {
  app: any;
  filter: FilterType;
  updateSorter: (value: string) => void;
  sorter: SorterType;
  userLocation: { latitude: number; longitude: number } | null;
}

const columnHeadings = [
  {
    width: "1/12",
    isClickable: false,
    name: "IP",
    value: "addr",
  },
  { isClickable: false, width: "1/12", name: "Name", value: "name" },
  { isClickable: true, width: "1/12", name: "Rank", value: "rank" },
  { isClickable: true, width: "2/12", name: "Next Wipe", value: "born_next" },
  { isClickable: true, width: "2/12", name: "Wiped", value: "born" },
  { isClickable: false, width: "1/12", name: "Uptime", value: "uptime" },
  { isClickable: true, width: "1/12", name: "Rate", value: "rate" },
  { isClickable: true, width: "1/12", name: "Group size", value: "max_group_size" },
  { isClickable: true, width: "1/12", name: "Players", value: "players" },
  { isClickable: false, width: "1/12", name: "Country", value: "rules.location.country" },
  {
    isClickable: false,
    width: "2/12",
    name: "Distance",
    value: "rules.location.longitude",
  },
];
//@ts-ignore
const ResultsTable: React.FC<ResultsTableProps> = ({
  app,
  filter,
  updateSorter,
  sorter,
  userLocation,
}) => {
  const { data, isFetching, error, status, fetchNextPage, hasNextPage } =
    useCustomInfiniteQuery(filter, sorter, app);

  const ref = useInfiniteScroll(hasNextPage, fetchNextPage);

  const router = useRouter();
  let renderAllResults;
  let resultsName = "Results loaded";

  if (isFetching) {
    resultsName = "Loading results...";
  }

  if (error instanceof Error) {
    renderAllResults = <div>An error has occurred: {error.message}</div>;
  }

  if (status === "success") {
    renderAllResults = (
      <div className="overflow-x-auto max-w-[80rem] m-4">
        <h2 className="text-xl font-bold mb-2">{resultsName}</h2>
        <table className="table-fixed w-full">
          <thead className="bg-gray-50">
            <tr>
              {columnHeadings.map((el) =>
                el.isClickable ? (
                  <th
                    onClick={() => updateSorter(el.value)}
                    key={el.value}
                    className={`w-${el.width} px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:cursor-pointer`}
                  >
                    {el.name}
                    {sorter[el.value] === 1 ? "->" : sorter[el.value] === -1 ? "<-" : null}
                  </th>
                ) : (
                  <th
                    key={el.value}
                    className={`w-${el.width} px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    {el.name}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                <tr>
                  {/* Empty row with border */}
                  <td
                    className="text-xs relative border-t text-center bg-indigo-200"
                    colSpan={11}
                  >
                    NEW DATA
                  </td>
                </tr>

                {page.result.map((mappedObject) => {
                  return (
                    <tr
                      key={mappedObject.addr}
                      className="hover:bg-sky-500 clickable-row cursor-pointer"
                      onClick={() => {
                        router.push(`/${mappedObject.addr}`);
                      }}
                      role="link"
                      ref={ref}
                    >
                      <td className="w-1/12 px-1 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {mappedObject.addr}
                      </td>

                      <td className="w-4/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {mappedObject.name}
                        <noscript>
                          <a href={`/${mappedObject.addr}`} className="table-row">
                            {mappedObject.addr}
                          </a>
                        </noscript>
                      </td>

                      <td className="w-1/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {mappedObject.rank}
                      </td>
                      <td className="w-1/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {getTime(mappedObject.born_next)}
                      </td>
                      <td className="w-1/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {getTime(mappedObject.born)}
                      </td>
                      <td className="w-1/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {mappedObject.rules?.uptime
                          ? getTimeUptime(mappedObject.rules?.uptime)
                          : "N/A"}
                      </td>
                      <td className="w-1/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {mappedObject.rate}
                      </td>
                      <td className="w-1/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {mappedObject.max_group_size}
                      </td>
                      <td className="w-1/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {mappedObject.players}
                      </td>
                      <td className="w-1/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {mappedObject.rules?.location?.country}
                      </td>
                      <td className="w-2/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {userLocation &&
                        mappedObject.rules?.location?.latitude &&
                        mappedObject.rules?.location?.longitude
                          ? calculateDistance(
                              mappedObject.rules?.location?.latitude,
                              mappedObject.rules?.location?.longitude,
                              userLocation.latitude,
                              userLocation.longitude
                            )
                          : "not known"}
                      </td>
                    </tr>
                  );
                })}
                {isFetching && (
                  <tr>
                    <td
                      className="text-xs relative border-t text-center bg-indigo-200"
                      colSpan={11}
                    >
                      LOADING...
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return renderAllResults;
};

// export default React.memo(ResultsTable);
export default ResultsTable;
