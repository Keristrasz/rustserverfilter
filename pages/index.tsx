import SearchResults from "@/components/SearchResults";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ServerPrimaryDataType } from "../mongoose/mongoosetypescript";
import { ServerPrimaryDataModel } from "@/mongoose/mongoosemodel";
import { mockData } from "../mongoose/mock";
import mongoose, { connect } from "mongoose";

function Home() {
  const [search, setSearch] = useState("");
  const [minPlayers, setMinPlayers] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [playerCount, setPlayerCount] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [excludeCountries, setExcludeCountries] = useState<string[]>([]);

  const [results, setResults] = useState<ServerPrimaryDataType>();

  console.log("index render");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleMinPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPlayers(event.target.value);
  };

  const handleMaxPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPlayers(event.target.value);
  };

  const handleMaxDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDistance(event.target.value);
  };

  const handlePlayerCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const country = event.target.value;
    if (countries.includes(country)) {
      setCountries(countries.filter((c) => c !== country));
    } else {
      setCountries([...countries, country]);
    }
  };

  const allCountries = ["US", "GE", "CA", "RU"];

  const handleExcludeCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const country = event.target.value;
    if (excludeCountries.includes(country)) {
      setExcludeCountries(excludeCountries.filter((c) => c !== country));
    } else {
      setExcludeCountries([...excludeCountries, country]);
    }
  };

  // const memoizedUrl = useMemo(() => url, [url]);

  // %5D - ]
  // %5C - [

  //&& operator is used to conditionally add a parameter to the params object only if it is truthy. If the parameter is falsy (i.e., an empty string, null, undefined, etc.), it won't be added to the URL.

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams({
      "filter[game]": "rust",
      // search,
      ...(minPlayers && { "filter[players][min]": minPlayers }),
      ...(maxPlayers && { "filter[players][max]": maxPlayers }),
      ...(countries.length > 0 && { "filter[countries]": countries.join(",") }),
      // "filter[maxDistance]": maxDistance,
      // "filter[playerCount]": playerCount,
      // "filter[excludeCountries]": excludeCountries.join(","),
    });

    getData.refetch();
  };

  // async function getFirstTenObjects() {
  //   try {
  //     await mongoose.connect('mongodb+srv://user:7o5InmsZJg2FqIgE@cluster6.jjfy6nr.mongodb.net/cluster6');
  //     const objects = await ServerPrimaryDataModel.find().limit(10);
  //     return objects;
  //   } catch (error) {
  //     console.error('Error retrieving objects:', error);
  //     throw error;
  //   } finally {
  //     await mongoose.disconnect();
  //   }
  // }

  const fetchData = async () => {
    console.log("connecting to db");
    await mongoose.connect(
      "mongodb+srv://user:7o5InmsZJg2FqIgE@cluster6.jjfy6nr.mongodb.net/cluster6"
    );
    console.log("connected ");
    const objects = await ServerPrimaryDataModel.find().limit(10);
    return objects;
  };

  // const fetchData = async (): Promise<Array<ServerPrimaryDataType>> => {
  //   return new Promise<Array<ServerPrimaryDataType>>((resolve) => {
  //     setTimeout(() => {
  //       resolve(mockData);
  //     }, 1000);
  //   });
  // };

  const getData = useQuery({
    queryKey: ["searchResults"],
    queryFn: fetchData,
  });

  let renderAllResults;

  if (getData.isLoading) renderAllResults = <div>Loading...</div>;

  if (getData.error instanceof Error)
    renderAllResults = <div>An error has occurred: {getData.error.message}</div>;

  if (getData.status === "success")
    renderAllResults = (
      <div className="overflow-x-auto max-w-[80rem]">
        <h2 className="text-xl font-bold mb-2">Results</h2>
        {/* <button
          disabled={getData.isFetching}
          onClick={() => {}}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Steam Server Query
        </button> */}
        {/* {getData.data.links.next && (
          <button
            disabled={getData.isFetching}
            onClick={() => {
              console.log(getData.data.links.next);
              // @ts-ignore
              url = getData.data.links.next;
              getData.refetch();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        )}
        {getData.data.links.prev && (
          <button
            disabled={getData.isFetching}
            onClick={() => {
              console.log(getData.data.links.prev);
              // @ts-ignore
              url = getData.data.links.prev;
              getData.refetch();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Prev
          </button>
        )} */}
        <table className="table-fixed w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-1/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP
              </th>
              <th className="w-1/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="w-1/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Wiped
              </th>
              <th className="w-1/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Wipe
              </th>
              <th className="w-1/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uptime
              </th>
              <th className="w-1/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rates
              </th>
              <th className="w-1/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modded
              </th>
              <th className="w-1/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group size
              </th>
              <th className="w-1/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Players
              </th>
              <th className="w-1/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="w-2/12 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getData.data?.map((mappedObject) => (
              <tr key={mappedObject.addr}>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.addr}
                </td>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.name}
                </td>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.born}
                </td>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.born_next}
                </td>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.rules?.uptime}
                </td>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.rate}
                </td>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.modded?.toString()}
                </td>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.max_group_size}
                </td>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.players}
                </td>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.rules?.location?.country}
                </td>
                <td className="w-2/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {mappedObject.rules?.location?.latitude === null
                    ? "Not known"
                    : `${mappedObject.rules?.location?.latitude} ${mappedObject.rules?.location?.longitude}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg p-6 space-y-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
            <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
              Search
            </label>
            <input
              id="search"
              type="text"
              className="form-input rounded-md shadow-sm mt-1 block w-full"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
            <label htmlFor="minPlayers" className="block text-gray-700 font-medium mb-2">
              Players
            </label>
            <div className="flex items-center">
              <input
                id="minPlayers"
                type="number"
                className="form-input rounded-md shadow-sm mt-1 block w-1/2 mr-2"
                value={minPlayers}
                onChange={handleMinPlayersChange}
              />
              <input
                id="maxPlayers"
                type="number"
                className="form-input rounded-md shadow-sm mt-1 block w-1/2"
                value={maxPlayers}
                onChange={handleMaxPlayersChange}
              />
            </div>
          </div>
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
            <label htmlFor="maxDistance" className="block text-gray-700 font-medium mb-2">
              Max. distance
            </label>
            <input
              id="maxDistance"
              type="number"
              className="form-input rounded-md shadow-sm mt-1 block w-full"
              value={maxDistance}
              onChange={handleMaxDistanceChange}
            />
          </div>
        </div>
        <div>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">Group size</legend>
            {/* <div className="flex flex-wrap">
              {groupSizeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center mr-4 mb-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    value={option.value}
                    checked={groupSize === option.value}
                    onChange={() => setGroupSize(option.value)}
                  />
                  <span className="ml-2 text-gray-700">{option.label}</span>
                </label>
              ))}
            </div> */}
          </fieldset>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">Player count</legend>
            <div className="flex items-center">
              <input
                id="playerCount"
                type="number"
                className="form-input rounded-md shadow-sm mt-1 block w-full"
                value={playerCount}
                onChange={handlePlayerCountChange}
              />
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">Countries</legend>
            <div className="flex flex-wrap">
              {allCountries.map((country) => (
                <label
                  key={country}
                  className="flex items-center mr-4 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    value={country}
                    checked={countries.includes(country)}
                    onChange={handleCountryChange}
                  />
                  <span className="ml-2 text-gray-700">{country}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">
              Exclude Countries
            </legend>
            <div className="flex flex-wrap">
              {allCountries.map((country) => (
                <label
                  key={country}
                  className="flex items-center mr-4 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    value={country}
                    checked={excludeCountries.includes(country)}
                    onChange={handleExcludeCountryChange}
                  />
                  <span className="ml-2 text-gray-700">{country}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <button
          type="submit"
          disabled={getData.isFetching}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </form>

      {renderAllResults}
    </div>
  );
}

export default Home;
