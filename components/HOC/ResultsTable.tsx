import THead from "../THead";
import React from "react";
import { useRouter } from "next/router";
import { calculateDistance, getCustomDate } from "@/utils/inputFunctions";
import {
  FilterType,
  SorterType,
  ServerPrimaryDataType,
  QueryResponseType,
} from "@/utils/typesTypescript";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useCustomInfiniteQuery from "@/hooks/useCustomInfiniteQuery";

import Spinner from "../Spinner";
import { InfiniteData } from "@tanstack/react-query";
import Link from "next/link";

const columnDataForMonitor = [
  { isClickable: true, styles: "w-1/12", name: "Score", value: "rank" },
  { isClickable: false, styles: "w-6/12", name: "Name", value: "name" },
  { isClickable: true, styles: "w-1/12", name: "Players", value: "players" },
  { isClickable: true, styles: "w-2/12", name: "Next Wipe", value: "born_next" },
  { isClickable: true, styles: "w-2/12", name: "Last Wipe", value: "born" },
  { isClickable: true, styles: "w-1/12", name: "Rate", value: "rate" },
  { isClickable: true, styles: "w-1/12", name: "Group size", value: "max_group_size" },
  {
    isClickable: false,
    styles: "w-2/12",
    name: "Country",
    value: "rules.location.country",
  },
  {
    isClickable: false,
    styles: "w-1/12",
    name: "Distance",
    value: "rules.location.longitude",
  },
];
const columnDataForMonitorForMobile = [
  {
    isClickable: false,
    styles: "w-7/12 text-[0.675rem] p-0",
    name: "Name",
    value: "name",
  },
  {
    isClickable: true,
    styles: "w-2/12 text-[0.675rem]",
    name: "Plrs",
    value: "players",
  },
  {
    isClickable: true,
    styles: "w-3/12 text-[0.675rem]",
    name: "Next Wipe",
    value: "born_next",
  },
  {
    isClickable: true,
    styles: "w-3/12 text-[0.675rem] p-0",
    name: "Last Wipe",
    value: "born",
  },
];

let columnData = columnDataForMonitor;

interface ResultsTableProps {
  app: any;
  filter: FilterType;
  sorter: SorterType;
  userLocation: { latitude: number; longitude: number } | null;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setSorter: React.Dispatch<React.SetStateAction<SorterType | {}>>;
  initialData?: InfiniteData<QueryResponseType>;
  isSSG: Boolean;
}

interface columnDataForMonitorType {
  isClickable: boolean;
  styles: string;
  name: string;
  value: string;
}

//@ts-ignore
const ResultsTable: React.FC<ResultsTableProps> = ({
  app,
  filter,
  sorter,
  setFilter,
  setSorter,
  userLocation,
  initialData,
  isSSG,
}) => {
  // ("resulttablerender");
  const { queryData, isFetching, isLoading, error, status, fetchNextPage, hasNextPage } =
    useCustomInfiniteQuery(filter, sorter, app);

  const ref = useInfiniteScroll(hasNextPage, fetchNextPage);

  const router = useRouter();
  let data = initialData;
  if (queryData) {
    data = queryData;
  }

  //adjust for mobile versions if is not SSG

  if (isSSG) {
    const MOBILE_WIDTH_THRESHOLD = 800; // Adjust the threshold as needed
    const isMobile =
      typeof window !== "undefined" && window.innerWidth < MOBILE_WIDTH_THRESHOLD;
    columnData = !isMobile ? columnDataForMonitor : columnDataForMonitorForMobile;
  }

  function getColumnValue(
    column: columnDataForMonitorType,
    mappedServer: ServerPrimaryDataType
  ) {
    const { value } = column;

    if (value === "born_next" || value === "born") {
      return getCustomDate(mappedServer[value]);
    } else if (value === "rules.location.country") {
      return mappedServer.rules?.location?.country;
    } else if (value === "rules.location.longitude") {
      if (
        userLocation &&
        mappedServer.rules?.location?.latitude &&
        mappedServer.rules?.location?.longitude
      ) {
        return calculateDistance(
          mappedServer.rules?.location?.latitude,
          mappedServer.rules?.location?.longitude,
          userLocation.latitude,
          userLocation.longitude
        );
      } else {
        return "";
      }
    } else if (value === "rate") {
      return mappedServer[value] ? mappedServer[value] + "x" : "";
    } else if (value === "max_group_size") {
      if (mappedServer[value] === 1) {
        return "Solo";
      } else if (mappedServer[value] === 2) {
        return "Duo";
      } else if (mappedServer[value] === 3) {
        return "Trio";
      } else if (mappedServer[value] === 4) {
        return "Quad";
      } else if (mappedServer[value]) {
        return "Max " + mappedServer[value];
      } else {
        return "";
      }
    } else if (
      value === "addr" ||
      value === "name" ||
      value === "rank" ||
      value === "players" ||
      value === "max_group_size"
    ) {
      return mappedServer[value];
    }
  }

  let isResultsRendered;
  let isLoadingStatus;

  if (isFetching) {
    isLoadingStatus = (
      <div className="flex flex-wrap mt-4 items-center">
        <Spinner />
        <h2 className="text-2xl font-bold mx-1 text-gray-200"> Loading results...</h2>
      </div>
    );
  } else {
    isLoadingStatus = (
      <h2 className="text-2xl font-bold mx-2 mt-4 text-gray-200"> Results loaded</h2>
    );
  }

  if (error instanceof Error) {
    isResultsRendered = <div>An error has occurred: {error.message}</div>;
  } else if (status === "success" || initialData) {
    isResultsRendered = (
      <div className="overflow-x-clip m-4 mb-8 max-w-6xl ">
        <table className=" table-fixed border w-full border-black  ">
          <THead
            setFilter={setFilter}
            setSorter={setSorter}
            sorter={sorter}
            isSSG={isSSG}
            columnData={columnData}
          />
          <tbody className="bg-zinc-700 divide-y divide-zinc-950">
            {data?.pages[0]?.totalCount[0]?.totalCount ? (
              <tr>
                <td
                  className="text-sm relative text-center bg-green-600 text-gray-200"
                  colSpan={11}
                >
                  Success! FOUND <b>{data?.pages[0]?.totalCount[0]?.totalCount}</b>{" "}
                  SERVERS
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  className="text-sm relative text-center bg-rustOne text-gray-200"
                  colSpan={11}
                >
                  FOUND <b>0</b> SERVERS!
                </td>
              </tr>
            )}

            {data?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.result.map((mappedServer: ServerPrimaryDataType) => {
                  return (
                    <tr
                      key={mappedServer.addr}
                      className="hover:bg-zinc-800 clickable-row cursor-pointer"
                      onClick={() => {
                        router.push(`/server/${mappedServer.addr}`);
                      }}
                      role="link"
                      ref={ref}
                    >
                      {columnData.map((column) =>
                        column.value === "name" ? (
                          <td
                            key={column.value}
                            className={`px-2 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis text-green-400 ${column.styles}`}
                          >
                            <Link href={`/server/${mappedServer.addr}`}>
                              {getColumnValue(column, mappedServer)}
                            </Link>
                          </td>
                        ) : column.value === "born" || column.value === "born_next" ? (
                          <td
                            suppressHydrationWarning={true}
                            key={column.value}
                            className={`px-2 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-200 ${column.styles}`}
                          >
                            {getColumnValue(column, mappedServer)}
                          </td>
                        ) : (
                          <td
                            key={column.value}
                            className={`px-2 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-200 ${column.styles}`}
                          >
                            {getColumnValue(column, mappedServer)}
                          </td>
                        )
                      )}
                    </tr>
                  );
                })}
                {page.result.length > 0 && (
                  <tr>
                    <td className="bg-green-700" colSpan={11}></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      {isLoadingStatus}
      {isResultsRendered}
      {isFetching && !isLoading ? (
        <div className="flex flex-wrap items-center mb-16">
          <Spinner />
          <h2 className="text-2xl font-bold mx-1 text-gray-200"> Loading more data...</h2>
        </div>
      ) : null}
    </>
  );
};

// export default React.memo(ResultsTable);
export default ResultsTable;
