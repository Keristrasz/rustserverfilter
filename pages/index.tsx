import SearchResults from "@/components/SearchResults";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { ServerPrimaryDataType } from "../utils/mongoosetypescript";
import useUserAuth from "../hooks/useUserAuth";
import Table from "../components/Table";
import { timeStamp } from "console";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchData } from "@/utils/fetchData";
import SelectCountries from "@/components/SelectCountries";
import { groupSizeOptions, ratesOptions } from "@/utils/inputData";
import { calculateDistance, getTime, getTimeUptime } from "@/utils/inputFunctions";
import useCustomInfiniteQuery from "@/hooks/useCustomInfiniteQuery";
import { useQueryClient } from "@tanstack/react-query";
//TODO Distance sort by loaded data

interface userLocationType {
  longitude: number;
  latitude: number;
}

interface SorterType {
  [key: string]: 1 | -1;
}

interface Filter {
  $and: {
    rank?: { $gte: number };
    "rules.size"?: { $gte?: number; $lte?: number };
    wipe_rotation?: string;
    players?: { $gte?: number; $lte?: number };
    name?: { $regex: string; $options: string };
    max_group_size?: { $in: number[] };
    rate?: { $in: number[] };
    "rules.location.country"?: { $in?: string[]; $nin?: string[] };
    "rules.location"?: {
      $geoWithin?: {
        $centerSphere: [number[], number];
      };
    };
  }[];
}

function Home() {
  const [minSize, setMinSize] = useState<number | string>("");
  const [maxSize, setMaxSize] = useState<number | string>("");

  const [includedCountries, setIncludedCountries] = useState<string[]>([]);
  const [excludedCountries, setExcludeCountries] = useState<string[]>([]);

  const [userLocation, setUserLocation] = useState<userLocationType | null>(null);

  const [minPlayers, setMinPlayers] = useState<number | string>("");
  const [maxPlayers, setMaxPlayers] = useState<number | string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [wipeRotation, setWipeRotation] = useState<string>("");
  const [maxGroupSize, setMaxGroupSize] = useState<number[]>([]);
  const [maxDistance, setMaxDistance] = useState<number | string>("");
  const [rate, setRate] = useState<number[]>([]);

  useEffect(() => {
    if (navigator.geolocation && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;
          latitude = parseFloat(latitude.toFixed(4));
          longitude = parseFloat(longitude.toFixed(4));
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    }
    //console.error("Geolocation is not supported by this browser.");
  }, [userLocation]);

  //SORTER START
  console.log(includedCountries, excludedCountries);
  const [sorter, setSorter] = useState<SorterType | {}>({});
  const handleSorter = (key: string) => {
    // { born_next: { $gte: nowSeconds }
    if (key === "born") {
      setFilter((prevValue) => {
        console.log(prevValue);
        console.log(prevValue.$and);
        if (!prevValue.$and.some((el) => el.born)) {
          let newValue = { ...prevValue };
          newValue.$and = newValue.$and.filter((el) => !el.born_next);
          newValue.$and.push({ born: { $lte: nowSeconds, $gte: timestampTenMonthsAgo } });
          console.log("newValue = " + JSON.stringify(newValue));
          return newValue;
        }
        return prevValue;
      });
    } else if (key === "born_next") {
      setFilter((prevValue) => {
        console.log(prevValue);
        console.log(prevValue.$and);
        if (!prevValue.$and.some((el) => el.born_next)) {
          let newValue = { ...prevValue };
          newValue.$and = newValue.$and.filter((el) => !el.born);
          newValue.$and.push({ born_next: { $gte: nowSeconds } });
          console.log("newValue = " + JSON.stringify(newValue));
          return newValue;
        }
        return prevValue;
      });
    } else if (
      key === "rules.location.longitude" ||
      key === "rules.location.country" ||
      key === "addr" ||
      key === "uptime"
    ) {
      return;
    } else {
      setFilter((prevValue) => {
        console.log(prevValue);
        console.log(prevValue.$and);
        let updatedValue = { ...prevValue };
        updatedValue.$and = updatedValue.$and.filter((el) => !el.born && !el.born_next);
        console.log("updatedValue = " + JSON.stringify(updatedValue));
        return updatedValue;
      });
    }
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
  const roundBySeconds = 100;
  const nowMiliseconds = new Date().getTime();
  const nowSeconds =
    Math.floor(nowMiliseconds / 1000 / roundBySeconds) * roundBySeconds - 100;
  const timestampTenMonthsAgo =
    Math.floor((nowMiliseconds / 1000 - 28000000) / roundBySeconds) * roundBySeconds;

  const [filter, setFilter] = useState<Filter>({
    $and: [{ rank: { $gte: 50 } }],
  });

  const updateFilter = () => {
    let newFilter: Filter = {
      $and: [{ rank: { $gte: 50 } }],
    };

    wipeRotation ? newFilter.$and.push({ wipe_rotation: wipeRotation }) : null;
    minPlayers ? newFilter.$and.push({ players: { $gte: minPlayers } }) : null;
    maxPlayers ? newFilter.$and.push({ players: { $lte: maxPlayers } }) : null;
    minSize ? newFilter.$and.push({ "rules.size": { $gte: minSize } }) : null;
    maxSize ? newFilter.$and.push({ "rules.size": { $lte: maxSize } }) : null;
    searchName
      ? newFilter.$and.push({ name: { $regex: searchName, $options: "i" } })
      : null;
    maxGroupSize.length !== 0
      ? newFilter.$and.push({ max_group_size: { $in: maxGroupSize } })
      : null;
    rate.length !== 0 ? newFilter.$and.push({ rate: { $in: rate } }) : null;
    includedCountries.length !== 0 && excludedCountries.length === 0
      ? newFilter.$and.push({ "rules.location.country": { $in: includedCountries } })
      : null;
    excludedCountries.length !== 0 && includedCountries.length === 0
      ? newFilter.$and.push({ "rules.location.country": { $nin: excludedCountries } })
      : null;
    includedCountries.length !== 0 && excludedCountries.length !== 0
      ? alert("There can be only included or excluded countries at once")
      : null;

    maxDistance && userLocation
      ? newFilter.$and.push({
          "rules.location": {
            $geoWithin: {
              $centerSphere: [
                [userLocation.latitude, userLocation.longitude],
                Number(parseFloat(maxDistance / 6371).toFixed(6)),
              ],
            },
          },
        })
      : null;
    //parseFloat(latitude.toFixed(4))
    console.log(newFilter);
    setFilter(newFilter);
    // console.log(newFilter);
  };

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
  const handleMinSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinSize(value === "" ? "" : Number(value));
    console.log("handling");
  };

  const handleMaxSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxSize(value === "" ? "" : Number(value));
  };

  const handleMaxDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (navigator.geolocation && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;
          latitude = parseFloat(latitude.toFixed(4));
          longitude = parseFloat(longitude.toFixed(4));
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    }
    setMaxDistance(value === "" ? "" : Number(value));
    console.log(userLocation, maxDistance);
    // console.error("Geolocation is not supported by this browser.")
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

  const app = useUserAuth();

  const pageSize = 30;

  const {
    data,
    isFetching,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomInfiniteQuery(filter, sorter, pageSize, app);

  // Infinite scroll event handler
  const handleScroll = () => {
    console.log(hasNextPage);
    if (
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      console.log("fetching next page");
      fetchNextPage();
    }
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  // Debounced scroll event handler
  const debouncedHandleScroll = debounce(handleScroll, 250);

  // Add scroll event listener
  useEffect(() => {
    console.log("scroll");
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateFilter();
  };

  const columnHeadings = [
    {
      width: "1/12",
      isClicked: false,
      name: "IP",
      value: "addr",
    },
    { isClicked: false, width: "1/12", name: "Name", value: "name" },
    { isClicked: false, width: "1/12", name: "Rank", value: "rank" },
    { isClicked: false, width: "2/12", name: "Next Wipe", value: "born_next" },
    { isClicked: false, width: "2/12", name: "Wiped", value: "born" },
    { isClicked: false, width: "1/12", name: "Uptime", value: "uptime" },
    { isClicked: false, width: "1/12", name: "Rate", value: "rate" },
    { isClicked: false, width: "1/12", name: "Group size", value: "max_group_size" },
    { isClicked: false, width: "1/12", name: "Players", value: "players" },
    { isClicked: false, width: "1/12", name: "Country", value: "rules.location.country" },
    {
      isClicked: false,
      width: "2/12",
      name: "Distance",
      value: "rules.location.longitude",
    },
  ];

  const handleResetForm = () => {
    setRate([]);
    setMinPlayers("");
    setMaxPlayers("");
    setMinSize("");
    setMaxSize("");
    setSearchName("");
    setWipeRotation("");
    setMaxGroupSize([]);
    setMaxDistance("");
    setSorter({});
    setExcludeCountries([]);
    setIncludedCountries([]);
    setFilter({ $and: [{ rank: { $gte: 50 } }] });
  };
  const router = useRouter();
  let renderAllResults;
  let resultsName = "Results loaded";

  if (isFetching) resultsName = "Loading results...";

  if (error instanceof Error)
    renderAllResults = <div>An error has occurred: {error.message}</div>;

  if (status === "success")
    renderAllResults = (
      <div className="overflow-x-auto max-w-[80rem] m-4 ">
        <h2
          onClick={() => router.push("/129.232.159.202:10040")}
          className="text-xl font-bold mb-2"
        >
          {resultsName}
        </h2>
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
            {data.pages.map((page, pageIndex) => (
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
                        {getTimeUptime(mappedObject.rules?.uptime)}
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

  return (
    <div className="flex flex-col items-center min-h-screen ">
      <header className="w-full bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Search Form</h1>
      </header>
      <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg p-6 space-y-6 m-4">
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
              <span className="text-gray-700">to</span>
              <input
                id="maxPlayers"
                type="number"
                className="form-input rounded-md shadow-sm mt-1 block w-1/2 ml-2"
                value={maxPlayers}
                onChange={handleMaxPlayersChange}
              />
            </div>
          </div>
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
            <label htmlFor="minPlayers" className="block text-gray-700 font-medium mb-2">
              Size
            </label>
            <div className="flex items-center">
              <input
                id="minSize"
                type="number"
                className="form-input rounded-md shadow-sm mt-1 block w-1/2 mr-2"
                value={minSize}
                onChange={handleMinSizeChange}
              />
              <span className="text-gray-700">to</span>
              <input
                id="maxSize"
                type="number"
                className="form-input rounded-md shadow-sm mt-1 block w-1/2 ml-2"
                value={maxSize}
                onChange={handleMaxSizeChange}
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
          <fieldset className="mt-6">
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
          <fieldset className="mt-6">
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
          <label className="block text-gray-700 font-medium mb-2">
            Include Countries
          </label>
          <SelectCountries
            countries={includedCountries}
            setCountries={setIncludedCountries}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Exclude Countries
          </label>
          <SelectCountries
            countries={excludedCountries}
            setCountries={setExcludeCountries}
          />
        </div>
        <button
          type="submit"
          disabled={isFetching}
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
