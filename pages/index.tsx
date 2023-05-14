import SearchResults from "@/components/SearchResults";
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ServerPrimaryDataType } from "../mongoose/mongoosetypescript";
// import { ServerPrimaryDataModel } from "@/mongoose/mongoosemodel";
// import mongoose, { connect } from "mongoose";
import { mockData } from "../mongoose/mock";
import * as Realm from "realm-web";
import { useApp } from "../hooks/useApp";

function Home() {
  // const [filter, setFilter] = useState({
  //   $and: [
  //     { rate: 2 },
  //     { players: { $gte: 10 } },
  //     { max_group_size: 3 },
  //     { "rules.size": 3500 },
  //   ],
  // });
  // const [sorter, setSorter] = useState({ players: -1 });
  // const [projection, setProjection] = useState({});

  const [country, setCountry] = useState<string>("");
  const [rate, setRate] = useState<number[]>([]);
  const [minPlayers, setMinPlayers] = useState<number>();
  const [maxPlayers, setMaxPlayers] = useState<number>();
  const [searchName, setSearchName] = useState<string>("");
  const [wipeRotation, setWipeRotation] = useState<string>("");
  const [maxGroupSize, setMaxGroupSize] = useState<number>();
  const [size, setSize] = useState<number>();
  const [maxDistance, setMaxDistance] = useState<number>();
  const [playerCount, setPlayerCount] = useState<number>();

  const now = Math.floor(Date.now() / 1000) - 60;
  console.log(now);
  //, { born_next: { $gte: now } }, { born_next: { $ne: null } }, { born: { $ne: null } }
  const [filter, setFilter] = useState({
    $and: [{}],
  });

  const updateFilter = () => {
    const newFilter = {
      $and: [{}],
    };

    country ? newFilter.$and.push({ "rules.location.country": country }) : null;
    size ? newFilter.$and.push({ "rules.size": size }) : null;
    wipeRotation ? newFilter.$and.push({ wipe_rotation: wipeRotation }) : null;
    minPlayers ? newFilter.$and.push({ players: { $gte: minPlayers } }) : null;
    maxPlayers ? newFilter.$and.push({ players: { $lte: maxPlayers } }) : null;
    searchName
      ? newFilter.$and.push({ name: { $regex: searchName, $options: "i" } })
      : null;
    maxGroupSize ? newFilter.$and.push({ max_group_size: maxGroupSize }) : null;

    rate.length !== 0 ? newFilter.$and.push({ rate: { $in: rate } }) : null;

    setFilter(newFilter);
    console.log(newFilter);
  };

  let sorter = {
    // born_next: 1,
  };
  let projection = {};

  console.log("index render");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  const handleMinPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handling");
    setMinPlayers(Number(event.target.value));
    console.log(minPlayers);
  };

  const handleMaxPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPlayers(Number(event.target.value));
  };

  const handleMaxDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDistance(Number(event.target.value));
  };

  const handlePlayerCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(Number(event.target.value));
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
    // if (countries.includes(country)) {
    //   setCountries(countries.filter((c) => c !== country));
    // } else {
    //   setCountries([...countries, country]);
    // }
  };

  const allCountries = ["Czech Republic", "Germany", "Canada", "Russia"];

  const handleExcludeCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const country = event.target.value;
    if (excludeCountries.includes(country)) {
      setExcludeCountries(excludeCountries.filter((c) => c !== country));
    } else {
      setExcludeCountries([...excludeCountries, country]);
    }
  };

  // const memoizedUrl = useMemo(() => url, [url]);

  //&& operator is used to conditionally add a parameter to the params object only if it is truthy. If the parameter is falsy (i.e., an empty string, null, undefined, etc.), it won't be added to the URL.

  // useEffect(() => {
  //   if (app?.currentUser) {
  //     const mongo = app?.currentUser?.mongoClient("mongodb-atlas");
  //     const plants = mongo.db("example").collection("plants");
  //     plants.findOne({ name }).then((foundPlant) => {
  //       setPlant(foundPlant);
  //     });
  //   }
  // }, [app, app?.currentUser, app?.currentUser?.id, name]);

  // const fetchData = async (): Promise<Array<ServerPrimaryDataType>> => {
  //   return new Promise<Array<ServerPrimaryDataType>>((resolve) => {
  //     setTimeout(() => {
  //       resolve(mockData);
  //     }, 1000);
  //   });
  // };
  const groupSizeOptions = [
    { value: 1, label: "solo" },
    { value: 2, label: "duo" },
    { value: 3, label: "trio" },
    { value: 4, label: "quad" },
    { value: 5, label: "penta" },
  ];

  const app = useApp();
  console.log("authentication" + app);
  // note: useEffect runs in the browser but does not run during server-side rendering
  useEffect(() => {
    // If no logged in user, log in
    if (app && !app.currentUser) {
      const anonymousUser = Realm.Credentials.anonymous();
      app.logIn(anonymousUser);
    }
  }, [app, app?.currentUser]);

  const fetchData = async (filter, sorter, projection) => {
    console.log("fetching data");
    const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
    if (!mongodb) return;
    const collection = mongodb.db("cluster6").collection("serverprimarycollections");
    const document = await collection.find(filter, {
      projection: projection,
      sort: sorter,
      limit: 50,
    });
    console.log(document);
    return document;
    // }
  };

  const getData = useQuery({
    queryKey: ["searchResults", filter, sorter, projection],
    queryFn: () => fetchData(filter, sorter, projection),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateFilter();
    console.log(filter, minPlayers);
    // getData.refetch();
    fetchData(filter, sorter, projection);
  };

  let renderAllResults;

  if (getData.isLoading) renderAllResults = <div>Loading...</div>;

  if (getData.error instanceof Error)
    renderAllResults = <div>An error has occurred: {getData.error.message}</div>;

  if (getData.status === "success")
    renderAllResults = (
      <div className="overflow-x-auto max-w-[80rem]">
        <h2 className="text-xl font-bold mb-2">Results</h2>
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
                Rank
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
                  {mappedObject.rank}
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
              value={searchName}
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
            <label htmlFor="minPlayers" className="block text-gray-700 font-medium mb-2">
              Min. Players
            </label>
            <div className="flex items-center">
              <input
                id="minPlayers"
                type="number"
                className="form-input rounded-md shadow-sm mt-1 block w-1/2 mr-2"
                value={minPlayers}
                onChange={handleMinPlayersChange}
              />
              <label
                htmlFor="minPlayers"
                className="block text-gray-700 font-medium mb-2"
              >
                Max. Players
              </label>
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
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
            <label htmlFor="maxDistance" className="block text-gray-700 font-medium mb-2">
              Rates
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
            <div className="flex flex-wrap">
              {groupSizeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center mr-4 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    value={option.value}
                    // checked={groupSize === option.value}
                    // onChange={() => setGroupSize(option.value)}
                  />
                  <span className="ml-2 text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
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
                    // checked={countries.includes(country)}
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
                    // checked={excludeCountries.includes(country)}
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
