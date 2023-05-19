import React from "react";

function Results() {
  let renderAllResults;
  let resultsName = "Results loaded";

  if (isFetching) resultsName = "Loading results...";

  if (error instanceof Error)
    renderAllResults = <div>An error has occurred: {error.message}</div>;

  if (status === "success")
    renderAllResults = (
      <div className="overflow-x-auto max-w-[80rem] m-4 ">
        <h2 className="text-xl font-bold mb-2">{resultsName}</h2>
        <table className="table-fixed w-full border-collapse rounded-lg ">
          <thead className="bg-gray-50">
            <tr>
              {columnHeadings.map((el) => (
                <th
                  onClick={() => handleSorter(el.value)}
                  key={el.value}
                  className={`w-${el.width} px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {el.name}

                  {sorter[el.value] === 1 ? "->" : sorter[el.value] === -1 ? "<-" : null}
                </th>
              ))}
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

                {page.result.map((mappedObject: ServerPrimaryDataType) => {
                  return (
                    <Link
                      key={mappedObject.addr}
                      href={`/${mappedObject.addr}`}
                      className="table-row"
                    >
                      {/* <tr key={mappedObject.addr}> */}
                      <td className="w-1/12 px-1 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {mappedObject.addr}
                      </td>
                      <td className="w-4/12 px-0.5 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {mappedObject.name}
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
                      {/* </tr> */}
                    </Link>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  return renderAllResults;
}

export default Results;
