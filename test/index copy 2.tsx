import React, { useState } from 'react';
import SelectCountries from './SelectCountries';

const YourFormComponent = () => {
  const [searchName, setSearchName] = useState('');
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [minSize, setMinSize] = useState('');
  const [maxSize, setMaxSize] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [minRank, setMinRank] = useState('');
  const [rate, setRate] = useState([]);
  const [maxGroupSize, setMaxGroupSize] = useState([]);
  const [wipeRotation, setWipeRotation] = useState([]);
  const [includedCountries, setIncludedCountries] = useState([]);
  const [excludedCountries, setExcludeCountries] = useState([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleResetForm = () => {
    setSearchName('');
    setMinPlayers('');
    setMaxPlayers('');
    setMinSize('');
    setMaxSize('');
    setMaxDistance('');
    setMinRank('');
    setRate([]);
    setMaxGroupSize([]);
    setWipeRotation([]);
    setIncludedCountries([]);
    setExcludeCountries([]);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleMinPlayersChange = (event) => {
    setMinPlayers(event.target.value);
  };

  const handleMaxPlayersChange = (event) => {
    setMaxPlayers(event.target.value);
  };

  const handleMinSizeChange = (event) => {
    setMinSize(event.target.value);
  };

  const handleMaxSizeChange = (event) => {
    setMaxSize(event.target.value);
  };

  const handleMaxDistanceChange = (event) => {
    setMaxDistance(event.target.value);
  };

  const handleMinRankChange = (event) => {
    setMinRank(event.target.value);
  };

  const handleRateChange = (event) => {
    const value = event.target.value;
    if (rate.includes(value)) {
      setRate(rate.filter((option) => option !== value));
    } else {
      setRate([...rate, value]);
    }
  };

  const handleGroupSizeChange = (event) => {
    const value = event.target.value;
    if (maxGroupSize.includes(value)) {
      setMaxGroupSize(maxGroupSize.filter((option) => option !== value));
    } else {
      setMaxGroupSize([...maxGroupSize, value]);
    }
  };

  const handleWipeRateChange = (event) => {
    const value = event.target.value;
    if (wipeRotation.includes(value)) {
      setWipeRotation(wipeRotation.filter((option) => option !== value));
    } else {
      setWipeRotation([...wipeRotation, value]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 rounded-lg p-10 pb-4 space-y-4 m-4 max-w-6xl"
    >
      <div className="flex flex-wrap justify-between items-center">
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
          <label htmlFor="search" className="block text-gray-400 font-medium mb-2">
            Search by name
          </label>
          <input
            id="search"
            type="text"
            className="form-input rounded-md shadow-sm mt-1 block w-full bg-gray-800 text-gray-200"
            value={searchName}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
          <label htmlFor="minPlayers" className="block text-gray-400 font-medium mb-2">
            Players
          </label>
          <div className="flex items-center">
            <input
              id="minPlayers"
              type="number"
              className="form-input rounded-md shadow-sm mt-1 block w-1/2 mr-2 bg-gray-800 text-gray-200"
              value={minPlayers}
              onChange={handleMinPlayersChange}
            />
            <span className="text-gray-400">to</span>
            <input
              id="maxPlayers"
              type="number"
              className="form-input rounded-md shadow-sm mt-1 block w-1/2 ml-2 bg-gray-800 text-gray-200"
              value={maxPlayers}
              onChange={handleMaxPlayersChange}
            />
          </div>
        </div>
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
          <label htmlFor="minSize" className="block text-gray-400 font-medium mb-2">
            Size
          </label>
          <div className="flex items-center">
            <input
              id="minSize"
              type="number"
              className="form-input rounded-md shadow-sm mt-1 block w-1/2 mr-2 bg-gray-800 text-gray-200"
              value={minSize}
              onChange={handleMinSizeChange}
            />
            <span className="text-gray-400">to</span>
            <input
              id="maxSize"
              type="number"
              className="form-input rounded-md shadow-sm mt-1 block w-1/2 ml-2 bg-gray-800 text-gray-200"
              value={maxSize}
              onChange={handleMaxSizeChange}
            />
          </div>
        </div>
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
          <label htmlFor="maxDistance" className="block text-gray-400 font-medium mb-2">
            Max. distance
          </label>
          <input
            id="maxDistance"
            type="number"
            className="form-input rounded-md shadow-sm mt-1 block w-full bg-gray-800 text-gray-200"
            value={maxDistance}
            onChange={handleMaxDistanceChange}
          />
        </div>
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
          <label htmlFor="minRank" className="block text-gray-400 font-medium mb-2">
            Min. rank
          </label>
          <input
            id="minRank"
            type="number"
            className="form-input rounded-md shadow-sm mt-1 block w-full bg-gray-800 text-gray-200"
            value={minRank}
            onChange={handleMinRankChange}
          />
        </div>
      </div>
      <div>
        <fieldset className="mt-6">
          <legend className="block text-gray-400 font-medium mb-2">Rates</legend>
          <div className="flex flex-wrap">
            {ratesOptions.map((el) => (
              <label key={el} className="flex items-center mr-4 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  value={el}
                  checked={rate.includes(el)}
                  onChange={handleRateChange}
                />
                <button
                  type="button"
                  className={`bg-gray-600 text-gray-100 rounded-md px-3 py-2 focus:outline-none ${
                    rate.includes(el) ? 'bg-red-600' : ''
                  }`}
                  onClick={() => handleRateChange(el)}
                >
                  {el}
                </button>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="block text-gray-400 font-medium mb-2">Group size</legend>
          <div className="flex flex-wrap">
            {groupSizeOptions.map((option) => (
              <label key={option.value} className="flex items-center mr-4 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  value={option.value}
                  checked={maxGroupSize.includes(option.value)}
                  onChange={handleGroupSizeChange}
                />
                <button
                  type="button"
                  className={`bg-gray-600 text-gray-100 rounded-md px-3 py-2 focus:outline-none ${
                    maxGroupSize.includes(option.value) ? 'bg-red-600' : ''
                  }`}
                  onClick={() => handleGroupSizeChange(option.value)}
                >
                  {option.label}
                </button>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="block text-gray-400 font-medium mb-2">Wipe rate</legend>
          <div className="flex flex-wrap">
            {wipeRatesOptions.map((option) => (
              <label key={option} className="flex items-center mr-4 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  value={option}
                  checked={wipeRotation.includes(option)}
                  onChange={handleWipeRateChange}
                />
                <button
                  type="button"
                  className={`bg-gray-600 text-gray-100 rounded-md px-3 py-2 focus:outline-none ${
                    wipeRotation.includes(option) ? 'bg-red-600' : ''
                  }`}
                  onClick={() => handleWipeRateChange(option)}
                >
                  {option}
                </button>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="m-0">
        <label className="block text-gray-400 font-medium my-1">Include Countries</label>
        <SelectCountries countries={includedCountries} setCountries={setIncludedCountries} />
      </div>
      <div className="m-0">
        <label className="block text-gray-400 font-medium my-1">Exclude Countries</label>
        <SelectCountries countries={excludedCountries} setCountries={setExcludeCountries} />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={buttonsDisabled}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-4 rounded w-48"
        >
          Search
        </button>
        <button
          type="button"
          disabled={buttonsDisabled}
          onClick={handleResetForm}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-4 rounded w-48"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default YourFormComponent;
