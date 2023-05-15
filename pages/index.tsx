import SearchResults from "@/components/SearchResults";
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ServerPrimaryDataType } from "../mongoose/mongoosetypescript";
// import { ServerPrimaryDataModel } from "@/mongoose/mongoosemodel";
// import mongoose, { connect } from "mongoose";
import { mockData } from "../mongoose/mock";
import * as Realm from "realm-web";
import { useApp } from "../hooks/useApp";
import Table from "../components/Table";
import { timeStamp } from "console";

// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const earthRadius = 6371; // Radius of the Earth in kilometers
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = Math.ceil(earthRadius * c);

//   return distance;
// }

// function toRadians(degrees) {
//   return degrees * (Math.PI / 180);
// }

// const targetLatitude = 48.8566;
// const targetLongitude = 2.3522;

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;

//       // Use the latitude and longitude values as needed
//       console.log(latitude, longitude);

//       // Call a function or perform further operations with the location data
//       // For example, you can calculate the distance between the user's location and a specific point
//       const distance = calculateDistance(latitude, longitude, targetLatitude, targetLongitude);
//       console.log(distance);
//     },
//     (error) => {
//       console.error("Error retrieving location:", error);
//     }
//   );
// } else {
//   console.error("Geolocation is not supported by this browser.");
// }

function Home() {
  // const [projection, setProjection] = useState({});

  const [country, setCountry] = useState<string[]>([]);
  const [minPlayers, setMinPlayers] = useState<number | string>("");
  const [maxPlayers, setMaxPlayers] = useState<number | string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [wipeRotation, setWipeRotation] = useState<string>("");
  const [maxGroupSize, setMaxGroupSize] = useState<number[]>([]);
  const [size, setSize] = useState<number | string>("");
  const [maxDistance, setMaxDistance] = useState<number | string>("");
  const [playerCount, setPlayerCount] = useState<number | string>("");
  const [rate, setRate] = useState<number[]>([]);

  //SORTER START

  const [sorter, setSorter] = useState({});
  const handleColumnSorter = (key) => {
    setSorter((prevSorter) => {
      // Check if the key already exists in the sorter
      if (prevSorter.hasOwnProperty(key)) {
        // Toggle the sort direction by multiplying the value by -1
        const newSortValue = prevSorter[key] * -1;
        // Remove the key if the sort direction is 1 (ascending)
        console.log(sorter);
        return { [key]: newSortValue }; //=== 1 ? {} : { [key]: newSortValue };
      } else {
        // Add the key with a default sort direction of -1 (descending)
        console.log(sorter);
        return { [key]: -1 };
      }
    });
  };

  //SORTER END

  const now = Math.floor(Date.now() / 1000) - 60;

  const [filter, setFilter] = useState({
    $and: [{}],
  });
  // { born_next: { $gte: now } }

  const updateFilter = () => {
    let newFilter = {
      $and: [{}],
    };

    country.length !== 0
      ? newFilter.$and.push({ "rules.location.country": { $in: country } })
      : null;
    size ? newFilter.$and.push({ "rules.size": size }) : null;
    wipeRotation ? newFilter.$and.push({ wipe_rotation: wipeRotation }) : null;
    minPlayers ? newFilter.$and.push({ players: { $gte: minPlayers } }) : null;
    maxPlayers ? newFilter.$and.push({ players: { $lte: maxPlayers } }) : null;
    searchName ? newFilter.$and.push({ name: { $regex: searchName, $options: "i" } }) : null;
    maxGroupSize.length !== 0
      ? newFilter.$and.push({ max_group_size: { $in: maxGroupSize } })
      : null;

    rate.length !== 0 ? newFilter.$and.push({ rate: { $in: rate } }) : null;
    console.log(newFilter);
    setFilter(newFilter);
    // console.log(newFilter);
  };

  let projection = {};

  // console.log("index render");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  const handleMinPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinPlayers(value === "" ? "" : Number(value));
    console.log("handling");
  };

  const handleMaxPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setMaxPlayers(value === "" ? "" : Number(value));
  };

  const handleMaxDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setMaxDistance(value === "" ? "" : Number(value));
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (country.includes(event.target.value)) {
      setCountry(country.filter((c) => c !== event.target.value));
    } else {
      setCountry([...country, event.target.value]);
    }
    console.log(country);
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(event.target.value);
    if (rate.includes(numberValue)) {
      setRate(rate.filter((c) => c !== numberValue));
    } else {
      setRate([...rate, numberValue]);
    }
    console.log(rate);
    console.log(numberValue);
  };
  const handleGroupSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(event.target.value);
    if (maxGroupSize.includes(numberValue)) {
      setMaxGroupSize(maxGroupSize.filter((c) => c !== numberValue));
    } else {
      setMaxGroupSize([...maxGroupSize, numberValue]);
    }
    console.log(maxGroupSize);
    console.log(numberValue);
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

  const groupSizeOptions = [
    { value: 1, label: "solo" },
    { value: 2, label: "duo" },
    { value: 3, label: "trio" },
    { value: 4, label: "quad" },
    { value: 5, label: "penta" },
  ];

  const ratesOptions = [2, 3, 4, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];

  const auth = async () => {
    const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID);
    if (app && !app.currentUser) {
      console.log("app && !app.currentUser");
      //this creates new user I guess
      const anonymousUser = Realm.Credentials.anonymous();
      await app.logIn(anonymousUser);
    }
    return app;
  };

  //is useQuery necessary though here?
  const { data: _app } = useQuery({
    queryKey: ["userAuth"],
    queryFn: auth,
    cacheTime: 1000 * 999999,
    staleTime: 1000 * 999999,
  });

  const app = _app;

  const fetchData = async (
    filter,
    sorter,
    projection
  ): Promise<ServerPrimaryDataType[] | undefined> => {
    console.log("fetching data" + app);
    if (!app) return;
    const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
    if (!mongodb) return;
    const collection = mongodb.db("cluster6").collection("serverprimarycollections");
    const document = await collection.find(filter, {
      projection: projection,
      sort: sorter,
      limit: 30,
    });
    console.log(document);
    return document;
  };

  const getData = useQuery({
    queryKey: ["searchResults", filter, sorter, projection],
    queryFn: () => fetchData(filter, sorter, projection),
    enabled: !!app && !!app.currentUser,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateFilter();

    // getData.refetch();
    // fetchData(filter, sorter, projection);
  };

  const getTime = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const formattedDate = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const dayMonth = date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
    });

    return `${formattedDate}, ${dayMonth}`;
  };

  const getTimeUptime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();

    return `${hours} hours `;
  };

  const columnHeadings = [
    {
      width: "1/12",
      isClicked: false,
      name: "IP",
      value: "addr",
    },
    { isClicked: false, width: "2/12", name: "Name", value: "name" },
    { isClicked: false, width: "1/12", name: "Rank", value: "rank" },
    { isClicked: false, width: "2/12", name: "Next Wipe", value: "born_next" },
    { isClicked: false, width: "2/12", name: "Wiped", value: "born" },
    { isClicked: false, width: "1/12", name: "Uptime", value: "uptime" },
    { isClicked: false, width: "1/12", name: "Rate", value: "rate" },
    { isClicked: false, width: "1/12", name: "Group size", value: "max_group_size" },
    { isClicked: false, width: "1/12", name: "Players", value: "players" },
    { isClicked: false, width: "1/12", name: "Country", value: "rules.location.country" },
    { isClicked: false, width: "1/12", name: "Distance", value: "rules.location.longitude" },
  ];

  const handleResetForm = () => {
    setCountry([]);
    setRate([]);
    setMinPlayers("");
    setMaxPlayers("");
    setSearchName("");
    setWipeRotation("");
    setMaxGroupSize([]);
    setSize("");
    setMaxDistance("");
    setPlayerCount("");
    setSorter({});
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
              {columnHeadings.map((el) => (
                <th
                  onClick={() => handleColumnSorter(el.value)}
                  key={el.value}
                  className={`w-${el.width} px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {el.name}{" "}
                  {sorter[el.value] === 1 ? "->" : sorter[el.value] === -1 ? "<-" : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getData.data?.map((mappedObject: ServerPrimaryDataType) => {
              return (
                <tr key={mappedObject.addr}>
                  <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {mappedObject.addr}
                  </td>
                  <td className="w-4/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {mappedObject.name}
                  </td>
                  <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {mappedObject.rank}
                  </td>
                  <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {getTime(mappedObject.born_next)}
                  </td>
                  <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {getTime(mappedObject.born)}
                  </td>
                  <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {getTimeUptime(mappedObject.rules?.uptime)}
                  </td>
                  <td className="w-1/12 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {mappedObject.rate}
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
              );
            })}
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
              Search by name
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
              <label htmlFor="minPlayers" className="block text-gray-700 font-medium mb-2">
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
        </div>
        <div>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">Rates</legend>
            <div className="flex flex-wrap">
              {ratesOptions.map((el) => (
                <label key={el} className="flex items-center mr-4 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    value={el}
                    checked={rate.includes(el)}
                    onChange={handleRateChange}
                  />
                  <span className="ml-2 text-gray-700">{el}</span>
                </label>
              ))}
            </div>
          </fieldset>
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
                    checked={maxGroupSize.includes(option.value)}
                    onChange={handleGroupSizeChange}
                  />
                  <span className="ml-2 text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">Countries</legend>
            <div className="flex flex-wrap">
              {allCountries.map((el) => (
                <label key={el} className="flex items-center mr-4 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    value={el}
                    checked={country.includes(el)}
                    onChange={handleCountryChange}
                  />
                  <span className="ml-2 text-gray-700">{el}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">Exclude Countries</legend>
            <div className="flex flex-wrap">
              {allCountries.map((country) => (
                <label key={country} className="flex items-center mr-4 mb-2 cursor-pointer">
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
        <button
          type="button"
          onClick={handleResetForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </form>

      {renderAllResults}
    </div>
  );
}

export default Home;
