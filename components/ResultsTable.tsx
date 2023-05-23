import THead from "./THead";
import React from "react";
import { useRouter } from "next/router";
import { calculateDistance, getTime, getTimeUptime } from "@/utils/inputFunctions";
import { FilterType, SorterType } from "@/utils/typesTypescript";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useCustomInfiniteQuery from "@/hooks/useCustomInfiniteQuery";

interface ResultsTableProps {
  app: any;
  filter: FilterType;
  sorter: SorterType;
  userLocation: { latitude: number; longitude: number } | null;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setSorter: React.Dispatch<React.SetStateAction<SorterType | {}>>;
}

//@ts-ignore
const ResultsTable: React.FC<ResultsTableProps> = ({
  app,
  filter,
  sorter,
  setFilter,
  setSorter,
  userLocation,
}) => {
  console.log("resulttablerender");
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
          <THead setFilter={setFilter} setSorter={setSorter} sorter={sorter} />
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

export default React.memo(ResultsTable);
// export default ResultsTable;
