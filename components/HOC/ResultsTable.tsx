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

export const columnData = [
  { isClickable: true, styles: "w-1/12", name: "Score", value: "rank" },
  { isClickable: false, styles: "w-6/12", name: "Name", value: "name" },
  { isClickable: true, styles: "w-1/12", name: "Players", value: "players" },
  { isClickable: true, styles: "w-2/12", name: "Next Wipe", value: "born_next" },
  { isClickable: true, styles: "w-2/12", name: "Last Wipe", value: "born" },
  { isClickable: true, styles: "w-1/12", name: "Rate", value: "rate" },
  { isClickable: true, styles: "w-1/12", name: "Group size", value: "max_group_size" },
  { isClickable: false, styles: "w-2/12", name: "Country", value: "rules.location.country" },
  {
    isClickable: false,
    styles: "w-1/12",
    name: "Distance",
    value: "rules.location.longitude",
  },
];

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

interface ColumnDataType {
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
  // console.log("resulttablerender");
  const { queryData, isFetching, isLoading, error, status, fetchNextPage, hasNextPage } =
    useCustomInfiniteQuery(filter, sorter, app);

  const ref = useInfiniteScroll(hasNextPage, fetchNextPage);

  const router = useRouter();
  let data = initialData;
  if (queryData) {
    data = queryData;
  }

  function getColumnValue(column: ColumnDataType, mappedServer: ServerPrimaryDataType) {
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
    }
    // else if (value === "uptime") {
    //   return mappedServer.rules?.uptime ? getTimeUptime(mappedServer.rules?.uptime) : "N/A";
    // }
    else if (
      value === "addr" ||
      value === "name" ||
      value === "rank" ||
      value === "players" ||
      value === "rate" ||
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
  }

  if (status === "success") {
    isResultsRendered = (
      <div className="overflow-x-clip m-4 mb-8 max-w-6xl ">
        <table className=" table-fixed border w-full border-black  ">
          <THead setFilter={setFilter} setSorter={setSorter} sorter={sorter} isSSG={isSSG} />
          <tbody className="bg-zinc-700 divide-y divide-zinc-950">
            {data?.pages[0]?.totalCount[0]?.totalCount ? (
              <tr>
                <td
                  className="text-sm relative text-center bg-green-600 text-gray-200"
                  colSpan={11}
                >
                  Success! FOUND <b>{data?.pages[0]?.totalCount[0]?.totalCount}</b> SERVERS
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
                      className="hover:bg-rustOne clickable-row cursor-pointer"
                      onClick={() => {
                        router.push(`/${mappedServer.addr}`);
                      }}
                      role="link"
                      ref={ref}
                    >
                      {columnData.map((column) =>
                        column.value === "name" ? (
                          <td
                            key={column.value}
                            className={`${column.styles} px-2 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis text-green-500`}
                          >
                            <Link href={`/${mappedServer.addr}`}>
                              {getColumnValue(column, mappedServer)}
                            </Link>
                          </td>
                        ) : (
                          <td
                            key={column.value}
                            className={`${column.styles} px-2 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-200`}
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

  //for getStaticProps

  if (initialData && !isResultsRendered) {
    console.log("initialData && !isResultsRendered");
    isResultsRendered = (
      <div className="overflow-x-clip m-4 mb-8 max-w-6xl ">
        <table className=" table-fixed border w-full border-black">
          <THead setFilter={setFilter} setSorter={setSorter} sorter={sorter} isSSG={isSSG} />
          <tbody className="bg-zinc-700 divide-y divide-zinc-950">
            {data?.pages[0]?.totalCount[0]?.totalCount ? (
              <tr>
                <td
                  className="text-sm relative text-center bg-green-600 text-gray-200"
                  colSpan={11}
                >
                  Success! FOUND <b>{data?.pages[0]?.totalCount[0]?.totalCount}</b> SERVERS
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
                      className="hover:bg-rustOne clickable-row cursor-pointer"
                      onClick={() => {
                        router.push(`/${mappedServer.addr}`);
                      }}
                      role="link"
                      ref={ref}
                    >
                      {columnData.map((column) =>
                        column.value === "name" ? (
                          <td
                            key={column.value}
                            className={`${column.styles} px-2 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis text-green-500`}
                          >
                            <Link href={`/${mappedServer.addr}`}>
                              {getColumnValue(column, mappedServer)}
                            </Link>
                          </td>
                        ) : (
                          <td
                            key={column.value}
                            className={`${column.styles} px-2 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-200`}
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
