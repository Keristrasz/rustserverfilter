import { useState, useEffect } from "react";
import { groupSizeOptions, ratesOptions, wipeRatesOptions } from "@/utils/inputData";
import SelectIncludeCountries from "../SelectIncludeCountries";
import SelectExcludeCountries from "../SelectExcludeCountries";
import useFilter from "@/hooks/useFilter";
import { userLocationType, SorterType, FilterType } from "../../utils/typesTypescript";

type FormProps = {
  userLocation: userLocationType | null;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setSorter: React.Dispatch<React.SetStateAction<SorterType | {}>>;
  filter: FilterType;
  sorter: SorterType;
  isSSG: Boolean;
};

// Helper function to get data from local storage
const getFromLocalStorage = (key: string, defaultValue: any): any => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  } else {
    return defaultValue;
  }
};

// Helper function to save data to local storage
const saveToLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const Form: React.FC<FormProps> = ({ userLocation, setFilter, setSorter, filter, sorter, isSSG }) => {
  const [wipeRotation, setWipeRotation] = useState<string[]>(
    getFromLocalStorage("wipeRotation", [])
  );
  const [excludedCountries, setExcludeCountries] = useState<string[]>([]);

  const [includedCountries, setIncludedCountries] = useState<string[]>([]);

  const [minSize, setMinSize] = useState<number | string>(getFromLocalStorage("minSize", ""));
  const [maxSize, setMaxSize] = useState<number | string>(getFromLocalStorage("maxSize", ""));
  const [minPlayers, setMinPlayers] = useState<number | string>(
    getFromLocalStorage("minPlayers", "")
  );
  const [maxPlayers, setMaxPlayers] = useState<number | string>(
    getFromLocalStorage("maxPlayers", "")
  );
  const [searchName, setSearchName] = useState<string>(getFromLocalStorage("searchName", ""));
  const [maxGroupSize, setMaxGroupSize] = useState<number[]>(
    getFromLocalStorage("maxGroupSize", [])
  );
  const [minRank, setMinRank] = useState<number | string>(getFromLocalStorage("minRank", ""));
  const [maxDistance, setMaxDistance] = useState<number | string>(
    getFromLocalStorage("maxDistance", "")
  );
  const [rate, setRate] = useState<number[]>(getFromLocalStorage("rate", []));

  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const updateFilter = useFilter(setFilter);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  const handleMinPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinPlayers(value === "" ? "" : Number(value));
  };

  const handleMaxPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxPlayers(value === "" ? "" : Number(value));
  };

  const handleMinSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinSize(value === "" ? "" : Number(value));
  };

  const handleMaxSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxSize(value === "" ? "" : Number(value));
  };

  const handleMaxDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxDistance(value === "" ? "" : Number(value));
  };
  const handleMinRankChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinRank(value === "" ? "" : Number(value));
  };

  const handleRateChange = (option: number) => {
    if (rate.includes(option)) {
      setRate(rate.filter((el) => el !== option));
    } else {
      setRate([...rate, option]);
    }
  };
  const handleGroupSizeChange = (option: number) => {
    if (maxGroupSize.includes(option)) {
      setMaxGroupSize(maxGroupSize.filter((el) => el !== option));
    } else {
      setMaxGroupSize([...maxGroupSize, option]);
    }
  };

  const handleWipeRotationChange = (option: string) => {
    if (wipeRotation.includes(option)) {
      setWipeRotation(wipeRotation.filter((el) => el !== option));
    } else {
      setWipeRotation([...wipeRotation, option]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonsDisabled(true);
    updateFilter(
      minRank,
      wipeRotation,
      minPlayers,
      maxPlayers,
      minSize,
      maxSize,
      searchName,
      maxGroupSize,
      rate,
      includedCountries,
      excludedCountries,
      maxDistance,
      userLocation
    );
    setTimeout(() => {
      // Enable buttons after the delay
      setButtonsDisabled(false);
    }, 1000);
  };

  const handleResetForm = () => {
    setButtonsDisabled(true);

    setRate([]);
    setMinRank("");
    setMinPlayers("");
    setMaxPlayers("");
    setMinSize("");
    setMaxSize("");
    setSearchName("");
    setWipeRotation([]);
    setMaxGroupSize([]);
    setMaxDistance("");
    setExcludeCountries([]);
    setIncludedCountries([]);
    setSorter({});
    setFilter({ $and: [{ rank: { $gte: 50 } }] });

    setTimeout(() => {
      // Enable buttons after the delay
      setButtonsDisabled(false);
    }, 1000);
  };

  // const saveAllStatesToLocalStorage = () => {
  //   saveToLocalStorage("wipeRotation", wipeRotation);
  //   saveToLocalStorage("excludedCountries", excludedCountries);
  //   saveToLocalStorage("includedCountries", includedCountries);
  //   saveToLocalStorage("minSize", minSize);
  //   saveToLocalStorage("maxSize", maxSize);
  //   saveToLocalStorage("minPlayers", minPlayers);
  //   saveToLocalStorage("maxPlayers", maxPlayers);
  //   saveToLocalStorage("searchName", searchName);
  //   saveToLocalStorage("maxGroupSize", maxGroupSize);
  //   saveToLocalStorage("minRank", minRank);
  //   saveToLocalStorage("maxDistance", maxDistance);
  //   saveToLocalStorage("rate", rate);
  //   console.log("stored to localstorage");
  // };

  useEffect(() => {
    // Save data to local storage whenever the state changes
    saveToLocalStorage("wipeRotation", wipeRotation);
    saveToLocalStorage("minSize", minSize);
    saveToLocalStorage("maxSize", maxSize);
    saveToLocalStorage("minPlayers", minPlayers);
    saveToLocalStorage("maxPlayers", maxPlayers);
    saveToLocalStorage("searchName", searchName);
    saveToLocalStorage("maxGroupSize", maxGroupSize);
    saveToLocalStorage("minRank", minRank);
    saveToLocalStorage("maxDistance", maxDistance);
    saveToLocalStorage("rate", rate);

    console.log("stored to localstorage");
  }, [filter, sorter]);



  console.log(maxPlayers, minRank, "wiperotation:" + wipeRotation, maxGroupSize);

  return (
    <form
      onSubmit={handleSubmit}
      className="  bg-zinc-800 rounded-lg p-10 pt-6 pb-4 space-y-4 m-4 mt-8 max-w-6xl border border-black"
    >
      <div className="flex flex-wrap items-center justify-start">
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4 sm:mt-2 sm:ml-0">
          <label htmlFor="search" className="block text-gray-200 font-semibold text-lg my-1">
            Search by name
          </label>
          <input
            id="search"
            type="text"
            className={`form-input  rounded-md shadow-sm mt-1 block w-full sm:w-64 border  bg-zinc-700 text-gray-200 focus:ring-0 focus:border-green-600 ${
              isSSG && searchName ? "border-rustOne" : "border-black"
            }`}
            value={searchName}
            placeholder="Server name"
            onChange={handleSearchChange}
          />
        </div>

        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4 sm:mt-2 sm:ml-0">
          <label htmlFor="minRank" className="block text-gray-200 font-semibold text-lg my-1">
            Server score
          </label>
          <input
            id="minRank"
            type="number"
            className={`form-input rounded-md shadow-sm mt-1 block w-full sm:w-48 bg-zinc-700 text-gray-200 focus:ring-0 focus:border-green-600 border  ${
              isSSG && minRank ? "border-rustOne" : "border-black"
            }`}
            value={minRank}
            placeholder="Min"
            onChange={handleMinRankChange}
          />
        </div>
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4 sm:mt-2 sm:ml-0">
          <label
            htmlFor="maxDistance"
            className="block text-gray-200 font-semibold text-lg my-1"
          >
            Server distance
          </label>
          <input
            id="maxDistance"
            type="number"
            className={`form-input rounded-md shadow-sm mt-1 block w-full sm:w-48 bg-zinc-700 text-gray-200 focus:ring-0 focus:border-green-600 border  ${
              isSSG && maxDistance ? "border-rustOne" : "border-black"
            }`}
            value={maxDistance}
            placeholder="Max"
            onChange={handleMaxDistanceChange}
          />
        </div>
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4 sm:mt-2 sm:ml-0">
          <label
            htmlFor="minPlayers"
            className="block text-gray-200 font-semibold text-lg my-1"
          >
            Players
          </label>
          <div className="flex items-center">
            <input
              id="minPlayers"
              type="number"
              value={minPlayers}
              className={`form-input rounded-md shadow-sm block w-1/2 sm:w-48 mr-2 border  bg-zinc-700 text-gray-200 focus:ring-0 focus:border-green-600 ${
                isSSG && minPlayers ? "border-rustOne" : "border-black"
              }`}
              placeholder="Min"
              onChange={handleMinPlayersChange}
            />
            <span className="text-gray-200">to</span>
            <input
              id="maxPlayers"
              type="number"
              className={`form-input rounded-md shadow-sm block w-1/2 sm:w-48 ml-2 bg-zinc-700 text-gray-200 focus:ring-0 focus:border-green-600 border  ${
                isSSG && maxPlayers ? "border-rustOne" : "border-black"
              }`}
              value={maxPlayers}
              placeholder="Max"
              onChange={handleMaxPlayersChange}
            />
          </div>
        </div>
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4 sm:mt-2 sm:ml-0">
          <label htmlFor="minSize" className="block text-gray-200 font-semibold text-lg my-1">
            Map size
          </label>
          <div className="flex items-center">
            <input
              id="minSize"
              type="number"
              className={`form-input rounded-md shadow-sm block w-1/2 sm:w-48 mr-2 bg-zinc-700 text-gray-200 focus:ring-0 focus:border-green-600 border ${
                isSSG && minSize ? "border-rustOne" : "border-black"
              }`}
              value={minSize}
              placeholder="Min"
              onChange={handleMinSizeChange}
            />
            <span className="text-gray-200">to</span>
            <input
              id="maxSize"
              type="number"
              className={`form-input rounded-md shadow-sm block w-1/2 sm:w-48 ml-2 bg-zinc-700 text-gray-200 focus:ring-0 focus:border-green-600 border ${
                isSSG && maxSize ? "border-rustOne" : "border-black"
              }`}
              value={maxSize}
              placeholder="Max"
              onChange={handleMaxSizeChange}
            />
          </div>
        </div>
      </div>
      <div>
        <fieldset className="mt-4">
          <legend className="block text-gray-200 font-semibold text-lg mb-2">RATES</legend>
          <div className="flex flex-wrap">
            {ratesOptions.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer rounded-md px-1 pt-1 pb-0.5 mr-2 mb-1 w-[3.225em] text-center border border-black ${
                  isSSG && rate.includes(option.value)
                    ? "bg-rustOne text-white"
                    : "bg-zinc-700 text-gray-200"
                }`}
                onClick={() => handleRateChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="block text-gray-200 font-semibold text-lg mb-2 ">
            GROUP SIZE
          </legend>
          <div className="flex flex-wrap">
            {groupSizeOptions.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer rounded-md px-2 pt-1 pb-0.5 mr-2 mb-1 w-16 text-center border border-black ${
                  isSSG && maxGroupSize.includes(option.value)
                    ? "bg-rustOne text-white"
                    : "bg-zinc-700 text-gray-200"
                }`}
                onClick={() => handleGroupSizeChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="block text-gray-200 font-semibold text-lg mb-1">WIPE RATE</legend>
          <div className="flex flex-wrap">
            {wipeRatesOptions.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer rounded-md px-3 pt-1 pb-0.5 mr-2 mb-1 w-24 text-center border border-black ${
                  isSSG && wipeRotation.includes(option.value)
                    ? "bg-rustOne text-white"
                    : "bg-zinc-700 text-gray-200"
                }`}
                onClick={() => handleWipeRotationChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="flex flex-wrap w-full justify-between">
        <div className="m-0 w-1/2 xl:max-w-[32.5em]">
          <label className="block text-gray-200 font-semibold text-lg my-1">
            Include Countries
          </label>
          <SelectIncludeCountries
            countries={includedCountries}
            setCountries={setIncludedCountries}
          />
        </div>
        <div className="m-0 w-1/2 xl:max-w-[32.5em] xl:ml-4">
          <label className="block text-gray-200 font-semibold text-lg my-1">
            Exclude Countries
          </label>
          <SelectExcludeCountries
            countries={excludedCountries}
            setCountries={setExcludeCountries}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={buttonsDisabled}
          className={`bg-rustOne text-white font-semibold py-2 px-4 mx-4 rounded sm:w-48 text-lg transition-all  ${
            buttonsDisabled
              ? "cursor-not-allowed  hover:bg-green-800"
              : "cursor-pointer  hover:bg-green-600"
          }`}
        >
          Search
        </button>
        <button
          type="button"
          disabled={buttonsDisabled}
          onClick={handleResetForm}
          className={`bg-rustOne text-white font-semibold py-2 px-4 mx-4 rounded sm:w-48 text-lg transition-all  ${
            buttonsDisabled
              ? "cursor-not-allowed hover:bg-green-800"
              : "cursor-pointer  hover:bg-green-600"
          }`}
        >
          Reset
        </button>
      </div>
    </form>
  );

  //
};

export default Form;
