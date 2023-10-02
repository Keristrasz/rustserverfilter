import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import {
  groupSizeOptions,
  ratesOptions,
  wipeRatesOptions,
  vanillaOptions,
  moddedOptions,
  hardcoreSoftcoreOptions,
} from "@/constants/formInputOptions";
import { userLocationType, SorterType, FilterType } from "../../../types/TGlobal";

import FormSelectCountries from "./subcomponents/FormSelectCountries";

import useFilter from "@/hooks/useFilter";

let didLocationToastRun = false;

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

const Form: React.FC<FormProps> = ({
  userLocation,
  setFilter,
  setSorter,
  filter,
  sorter,
  isSSG,
}) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const [isExpanded, setIsExpanded] = useState<boolean>(
    getFromLocalStorage("isExpanded", false)
  );

  const [isVanilla, setIsVanilla] = useState<boolean | null>(
    getFromLocalStorage("isVanilla", null)
  );
  const [isModded, setIsModded] = useState<boolean | null>(
    getFromLocalStorage("isModded", null)
  );
  const [hardcoreSoftcore, setHardcoreSoftcore] = useState<string[]>(
    getFromLocalStorage("hardcoreSoftcore", [])
  );

  const [wipeRotation, setWipeRotation] = useState<string[]>(
    getFromLocalStorage("wipeRotation", [])
  );
  const [excludedCountries, setExcludedCountries] = useState<string[]>(
    getFromLocalStorage("excludedCountries", [])
  );

  const [includedCountries, setIncludedCountries] = useState<string[]>(
    getFromLocalStorage("includedCountries", [])
  );

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

  const updateFilter = useFilter(setFilter);

  const handleIsVanillaChange = (option: boolean) => {
    if ((isVanilla === true && option === true) || (isVanilla === false && option === false)) {
      setIsVanilla(null);
    } else if (
      (isVanilla === false && option === true) ||
      (isVanilla === true && option === false)
    ) {
      setIsVanilla(option);
    } else {
      setIsVanilla(option);
    }
  };
  const handleIsModdedChange = (option: boolean) => {
    if ((isModded === true && option === true) || (isModded === false && option === false)) {
      setIsModded(null);
    } else if (
      (isModded === false && option === true) ||
      (isModded === true && option === false)
    ) {
      setIsModded(option);
    } else {
      setIsModded(option);
    }
  };
  const handleHardcoreSoftcoreChange = (option: string) => {
    if (hardcoreSoftcore.includes(option)) {
      setHardcoreSoftcore(hardcoreSoftcore.filter((el) => el !== option));
    } else {
      setHardcoreSoftcore([...hardcoreSoftcore, option]);
    }
  };

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
    if (!userLocation && !didLocationToastRun) {
      toast.info("Can not retrieve your location! Distance will not show correctly");
    } else if (!userLocation && maxDistance) {
      toast.info(
        "You are trying to search by Server distance, but we could not retrieve your location! Distance will not show correctly"
      );
    }
    didLocationToastRun = true;
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
      userLocation,
      isVanilla,
      isModded,
      hardcoreSoftcore
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
    setExcludedCountries([]);
    setIncludedCountries([]);
    setIsModded(null);
    setIsVanilla(null);
    setHardcoreSoftcore([]);
    setSorter({ players: -1 });
    setFilter({
      $and: [
        {
          rank: { $gte: 500 },
        },
      ],
    });
    setTimeout(() => {
      // Enable buttons after the delay
      setButtonsDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    // Save data to local storage whenever the state changes
    saveToLocalStorage("isExpanded", isExpanded);
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
    saveToLocalStorage("excludedCountries", excludedCountries);
    saveToLocalStorage("includedCountries", includedCountries);
    saveToLocalStorage("isVanilla", isVanilla);
    saveToLocalStorage("isModded", isModded);
    saveToLocalStorage("hardcoreSoftcore", hardcoreSoftcore);
  }, [filter, sorter, isExpanded]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  let expandedForm = (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 rounded-lg p-10 pt-6 pb-4 m-4 mt-4 max-w-6xl border border-black w-full"
    >
      <div className="flex flex-wrap items-center justify-start">
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4  sm:ml-0 ">
          <label
            htmlFor="search"
            className="block text-gray-200 font-semibold text-lg my-1 hover:cursor-pointer hover:text-white"
          >
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

        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4  sm:ml-0">
          <label
            htmlFor="minRank"
            className="block text-gray-200 font-semibold text-lg my-1 hover:text-white hover:cursor-pointer"
          >
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
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4  sm:ml-0">
          <label
            htmlFor="maxDistance"
            className="block text-gray-200 font-semibold text-lg my-1 hover:text-white hover:cursor-pointer"
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
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4  sm:ml-0">
          <label
            htmlFor="minPlayers"
            className="block text-gray-200 font-semibold text-lg my-1 hover:text-white hover:cursor-pointer"
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
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4  sm:ml-0">
          <label
            htmlFor="minSize"
            className="block text-gray-200 font-semibold text-lg my-1 hover:text-white hover:cursor-pointer"
          >
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
        <div className="flex flex-col">
          <fieldset className="">
            <legend className="block text-gray-200 font-semibold text-lg mb-1">Rates</legend>
            <div className="flex flex-wrap">
              {ratesOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-md px-1 pt-1 pb-0.5 mr-2 mb-1 w-14 text-center border border-black hover:text-white ${
                    isSSG && rate.includes(option.value)
                      ? "bg-rustOne text-white"
                      : "bg-zinc-700 text-gray-200"
                  }`}
                >
                  <input
                    id={option.label}
                    type="checkbox"
                    className="hidden"
                    value={option.value}
                    checked={rate.includes(option.value)}
                    onChange={() => handleRateChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-3">
            <legend className="block text-gray-200 font-semibold text-lg mb-1 ">
              Group Size
            </legend>
            <div className="flex flex-wrap">
              {groupSizeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-md px-2 pt-1 pb-0.5 mr-2 mb-1 w-16 text-center border border-black hover:text-white ${
                    isSSG && maxGroupSize.includes(option.value)
                      ? "bg-rustOne text-white"
                      : "bg-zinc-700 text-gray-200"
                  }`}
                >
                  <input
                    id={option.label}
                    type="checkbox"
                    className="hidden"
                    value={option.value}
                    checked={maxGroupSize.includes(option.value)}
                    onChange={() => handleGroupSizeChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        {/* <div className="flex flex-row flex-wrap justify-between">
          <fieldset className="mt-3">
            <legend className="block text-gray-200 font-semibold text-lg mb-1">
              Wipe Rotation
            </legend>
            <div className="flex flex-wrap">
              {wipeRatesOptions.map((option) => (
                <div
                  key={option.value}
                  className={`cursor-pointer rounded-md px-3 pt-1 pb-0.5 mr-2 mb-1 w-24 text-center border border-black  hover:text-white ${
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
          <fieldset className="mt-3">
            <legend className="block text-gray-200 font-semibold text-lg mb-1">
              Vanilla
            </legend>
            <div className="flex flex-wrap">
              {vanillaOptions.map((option) => (
                <div
                  key={option.label}
                  className={`cursor-pointer rounded-md px-3 pt-1 pb-0.5 mr-2 mb-1 w-28 text-center border border-black  hover:text-white ${
                    isSSG &&
                    ((isVanilla === true && option.value === true) ||
                      (isVanilla === false && option.value === false))
                      ? "bg-rustOne text-white"
                      : "bg-zinc-700 text-gray-200"
                  }`}
                  onClick={() => handleIsVanillaChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-3">
            <legend className="block text-gray-200 font-semibold text-lg mb-1">
              Modded
            </legend>
            <div className="flex flex-wrap">
              {moddedOptions.map((option) => (
                <div
                  key={option.label}
                  className={`cursor-pointer rounded-md px-3 pt-1 pb-0.5 mr-2 mb-1 w-[7.5rem] text-center border border-black  hover:text-white ${
                    isSSG &&
                    ((isModded === true && option.value === true) ||
                      (isModded === false && option.value === false))
                      ? "bg-rustOne text-white"
                      : "bg-zinc-700 text-gray-200"
                  }`}
                  onClick={() => handleIsModdedChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-3">
            <legend className="block text-gray-200 font-semibold text-lg mb-1">
              Hardcore / Softcore
            </legend>
            <div className="flex flex-wrap">
              {hardcoreSoftcoreOptions.map((option) => (
                <div
                  key={option.value}
                  className={`cursor-pointer rounded-md px-3 pt-1 pb-0.5 mr-2 mb-1 w-24 text-center border border-black  hover:text-white ${
                    isSSG && hardcoreSoftcore.includes(option.value)
                      ? "bg-rustOne text-white"
                      : "bg-zinc-700 text-gray-200"
                  }`}
                  onClick={() => handleHardcoreSoftcoreChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </fieldset>
        </div> */}
        <div className="flex flex-row flex-wrap justify-between">
          <fieldset className="mt-3">
            <legend className="block text-gray-200 font-semibold text-lg mb-1">
              Wipe Rotation
            </legend>
            <div className="flex flex-wrap">
              {wipeRatesOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-md px-3 pt-1 pb-0.5 mr-2 mb-1 w-24 text-center border border-black  hover:text-white ${
                    isSSG && wipeRotation.includes(option.value)
                      ? "bg-rustOne text-white"
                      : "bg-zinc-700 text-gray-200"
                  }`}
                >
                  <input
                    id={option.label}
                    type="checkbox"
                    className="hidden"
                    value={option.value}
                    checked={wipeRotation.includes(option.value)}
                    onChange={() => handleWipeRotationChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-3">
            <legend className="block text-gray-200 font-semibold text-lg mb-1">Vanilla</legend>
            <div className="flex flex-wrap">
              {vanillaOptions.map((option) => (
                <label
                  key={option.label}
                  className={`cursor-pointer rounded-md px-3 pt-1 pb-0.5 mr-2 mb-1 w-28 text-center border border-black  hover:text-white ${
                    isSSG &&
                    ((isVanilla === true && option.value === true) ||
                      (isVanilla === false && option.value === false))
                      ? "bg-rustOne text-white"
                      : "bg-zinc-700 text-gray-200"
                  }`}
                >
                  <input
                    id={option.label}
                    type="checkbox"
                    className="hidden"
                    value={option.label}
                    checked={
                      (isVanilla === true && option.value === true) ||
                      (isVanilla === false && option.value === false)
                    }
                    onChange={() => handleIsVanillaChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-3">
            <legend className="block text-gray-200 font-semibold text-lg mb-1">Modded</legend>
            <div className="flex flex-wrap">
              {moddedOptions.map((option) => (
                <label
                  key={option.label}
                  className={`cursor-pointer rounded-md px-3 pt-1 pb-0.5 mr-2 mb-1 w-[7.5rem] text-center border border-black  hover:text-white ${
                    isSSG &&
                    ((isModded === true && option.value === true) ||
                      (isModded === false && option.value === false))
                      ? "bg-rustOne text-white"
                      : "bg-zinc-700 text-gray-200"
                  }`}
                >
                  <input
                    id={option.label}
                    type="checkbox"
                    className="hidden"
                    value={option.label}
                    checked={
                      (isModded === true && option.value === true) ||
                      (isModded === false && option.value === false)
                    }
                    onChange={() => handleIsModdedChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-3">
            <legend className="block text-gray-200 font-semibold text-lg mb-1">
              Hardcore / Softcore
            </legend>
            <div className="flex flex-wrap">
              {hardcoreSoftcoreOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-md px-3 pt-1 pb-0.5 mr-2 mb-1 w-24 text-center border border-black  hover:text-white ${
                    isSSG && hardcoreSoftcore.includes(option.value)
                      ? "bg-rustOne text-white"
                      : "bg-zinc-700 text-gray-200"
                  }`}
                >
                  <input
                    id={option.label}
                    type="checkbox"
                    className="hidden"
                    value={option.value}
                    checked={hardcoreSoftcore.includes(option.value)}
                    onChange={() => handleHardcoreSoftcoreChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <div className="flex flex-wrap w-full justify-between mt-2">
        <div className="m-0 w-1/2 xl:max-w-[32.5em]">
          <label
            htmlFor="includeCountries"
            className="block text-gray-200 font-semibold text-lg my-1 hover:text-white hover:cursor-pointer"
          >
            Include Countries
          </label>
          <FormSelectCountries
            id="includeCountries"
            countries={includedCountries}
            setCountries={setIncludedCountries}
          />
        </div>
        <div className="m-0 w-1/2 xl:max-w-[32.5em] xl:ml-4">
          <label
            htmlFor="excludeCountries"
            className="block text-gray-200 font-semibold text-lg my-1 hover:text-white hover:cursor-pointer"
          >
            Exclude Countries
          </label>
          <FormSelectCountries
            id="excludeCountries"
            countries={excludedCountries}
            setCountries={setExcludedCountries}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center mt-5 relative">
        <div>
          <button
            type="submit"
            disabled={buttonsDisabled}
            className={`bg-rustOne text-white font-semibold py-2 px-4 mx-4 rounded md:w-48 text-lg transition-all  ${
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
            className={`bg-rustOne text-white font-semibold py-2 px-4 mx-4 rounded md:w-48 text-lg transition-all  ${
              buttonsDisabled
                ? "cursor-not-allowed hover:bg-green-800"
                : "cursor-pointer  hover:bg-green-600"
            }`}
          >
            Reset
          </button>
        </div>
        <button
          type="button"
          disabled={buttonsDisabled}
          onClick={toggleExpansion}
          className={`bg-green-600 border border-black text-gray-200 font-semibold [text-shadow:_1px_1px_1px_black] py-2 px-2 m-2 rounded text-sm transition-all cursor-pointer hover:bg-zinc-900 sm:absolute sm:mb-0 sm:right-[-7px]`}
        >
          Shrink
        </button>
      </div>
    </form>
  );
  let notExpandedForm = (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 rounded-lg p-10 pt-6 pb-4 m-4 mt-4 max-w-6xl border border-black w-full"
    >
      <div className="flex flex-wrap items-center justify-start ">
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4  sm:ml-0 ">
          <label
            htmlFor="search"
            className="block text-gray-200 font-semibold text-lg my-1 hover:cursor-pointer hover:text-white"
          >
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
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4  sm:ml-0">
          <label
            htmlFor="minPlayers"
            className="block text-gray-200 font-semibold text-lg my-1 hover:text-white hover:cursor-pointer"
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
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 sm:mr-8 sm:mb-4  sm:ml-0">
          <label
            htmlFor="minRank"
            className="block text-gray-200 font-semibold text-lg my-1 hover:text-white hover:cursor-pointer"
          >
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
      </div>
      <div className="">
        <fieldset className="">
          <legend className="block text-gray-200 font-semibold text-lg mb-1">Rates</legend>
          <div className="flex flex-wrap">
            {ratesOptions.map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer rounded-md px-1 pt-1 pb-0.5 mr-2 mb-1 w-14 text-center border border-black hover:text-white ${
                  isSSG && rate.includes(option.value)
                    ? "bg-rustOne text-white"
                    : "bg-zinc-700 text-gray-200"
                }`}
              >
                <input
                  id={option.label}
                  type="checkbox"
                  className="hidden"
                  value={option.value}
                  checked={rate.includes(option.value)}
                  onChange={() => handleRateChange(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-3">
          <legend className="block text-gray-200 font-semibold text-lg mb-1 ">
            Group Size
          </legend>
          <div className="flex flex-wrap">
            {groupSizeOptions.map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer rounded-md px-2 pt-1 pb-0.5 mr-2 mb-1 w-16 text-center border border-black hover:text-white ${
                  isSSG && maxGroupSize.includes(option.value)
                    ? "bg-rustOne text-white"
                    : "bg-zinc-700 text-gray-200"
                }`}
              >
                <input
                  id={option.label}
                  type="checkbox"
                  className="hidden"
                  value={option.value}
                  checked={maxGroupSize.includes(option.value)}
                  onChange={() => handleGroupSizeChange(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-wrap justify-center items-center mt-5 relative">
        <div>
          <button
            type="submit"
            disabled={buttonsDisabled}
            className={`bg-rustOne text-white font-semibold py-2 px-4 mx-4 rounded md:w-48 text-lg transition-all  ${
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
            className={`bg-rustOne text-white font-semibold py-2 px-4 mx-4 rounded md:w-48 text-lg transition-all  ${
              buttonsDisabled
                ? "cursor-not-allowed hover:bg-green-800"
                : "cursor-pointer  hover:bg-green-600"
            }`}
          >
            Reset
          </button>
        </div>
        <button
          type="button"
          disabled={buttonsDisabled}
          onClick={toggleExpansion}
          className={
            "bg-green-600 border border-black text-gray-200 [text-shadow:_1px_1px_1px_black] font-semibold py-2 px-2 m-2 mt-4 rounded text-sm transition-all cursor-pointer hover:bg-zinc-900 sm:absolute sm:mb-0 sm:right-[-7px] animate-bounce"
          }
        >
          Expand
        </button>
      </div>
    </form>
  );

  return (
    <>
      <h1 className="text-xs mt-4 text-gray-300">Rust server search form</h1>
      {isExpanded && isSSG ? expandedForm : notExpandedForm}
    </>
  );

  //
};

export { Form };
