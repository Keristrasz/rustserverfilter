import { useState } from "react";
import { groupSizeOptions, ratesOptions } from "@/utils/inputData";
import SelectCountries from "./SelectCountries";
import useFilter from "@/hooks/useFilter";
import { userLocationType, SorterType, FilterType } from "../utils/typesTypescript";

type FormProps = {
  isFetching: boolean;
  userLocation: userLocationType | null;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setSorter: React.Dispatch<React.SetStateAction<SorterType | {}>>;
};

const Form: React.FC<FormProps> = ({ isFetching, userLocation, setFilter, setSorter }) => {
  const [wipeRotation, setWipeRotation] = useState<string>("");
  const [excludedCountries, setExcludeCountries] = useState<string[]>([]);
  const [includedCountries, setIncludedCountries] = useState<string[]>([]);
  const [minSize, setMinSize] = useState<number | string>("");
  const [maxSize, setMaxSize] = useState<number | string>("");
  const [minPlayers, setMinPlayers] = useState<number | string>("");
  const [maxPlayers, setMaxPlayers] = useState<number | string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [maxGroupSize, setMaxGroupSize] = useState<number[]>([]);
  const [maxDistance, setMaxDistance] = useState<number | string>("");
  const [rate, setRate] = useState<number[]>([]);

  const { updateFilter } = useFilter(setFilter);

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

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(event.target.value);
    if (rate.includes(numberValue)) {
      setRate(rate.filter((c) => c !== numberValue));
    } else {
      setRate([...rate, numberValue]);
    }
  };

  const handleGroupSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(event.target.value);
    if (maxGroupSize.includes(numberValue)) {
      setMaxGroupSize(maxGroupSize.filter((c) => c !== numberValue));
    } else {
      setMaxGroupSize([...maxGroupSize, numberValue]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateFilter(
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
  };

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
    setExcludeCountries([]);
    setIncludedCountries([]);
    setSorter({});
    setFilter({ $and: [{ rank: { $gte: 50 } }] });
  };

  return (
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
              <label key={option.value} className="flex items-center mr-4 mb-2 cursor-pointer">
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
        <label className="block text-gray-700 font-medium mb-2">Include Countries</label>
        <SelectCountries countries={includedCountries} setCountries={setIncludedCountries} />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Exclude Countries</label>
        <SelectCountries countries={excludedCountries} setCountries={setExcludeCountries} />
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
  );
};

export default Form;
