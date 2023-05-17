import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
} from "react";
import { allCountries } from "@/utils/countries";

interface SelectIncludedCountriesProps {
  countries: string[];
  setCountries: (countries: string[]) => void;
}

function SelectCountries({
  countries,
  setCountries,
}: SelectIncludedCountriesProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const optionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log("SelectCountries render");

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // const handleCountryChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   const { value, checked } = e.target;
  //   setCountries((prevSelected) => {
  //     if (checked) {
  //       setInputValue("");
  //       if (!prevSelected.includes(value)) {
  //         return [...prevSelected, value];
  //       }
  //     } else {
  //       return prevSelected.filter((country) => country !== value);
  //     }
  //     return prevSelected;
  //   });
  // };

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    if (checked) {
      setInputValue("");
      if (!countries.includes(value)) {
        const updatedCountries = [...countries, value];
        setCountries(updatedCountries);
      }
    } else {
      const updatedCountries = countries.filter((country) => country !== value);
      setCountries(updatedCountries);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (value.includes(",")) {
      setInputValue(value.replace(",", ""));
    } else {
      setInputValue(value);
    }
    setIsOpen(true);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || (e.key === "," && inputValue)) {
      e.preventDefault();
      const country = inputValue.trim();
      if (!countries.includes(country)) {
        setCountries((prevSelected) => [...prevSelected, country]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue.length === 0) {
      setCountries((prevSelected) => prevSelected.slice(0, -1));
    }
  };

  const handleRemoveCountry = (country: string): void => {
    setCountries((prevSelected) => prevSelected.filter((c) => c !== country));
  };

  const handleOutsideClick = (e: MouseEvent): void => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(e.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const filteredOptions = allCountries.filter((country) =>
    country.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <div
        className="w-full py-2 pl-3 pr-2 text-left bg-white rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 flex flex-wrap"
        onClick={handleToggle}
      >
        {countries.length > 0 &&
          countries.map((country) => (
            <span
              key={country}
              className="px-2 py-0 mx-1 bg-blue-100 text-blue-800 rounded-md flex items-center"
            >
              {country}
              <button
                className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={() => handleRemoveCountry(country)}
              >
                &#10005;
              </button>
            </span>
          ))}
        <input
          type="text"
          className="flex-grow ml-2 bg-transparent focus:outline-none"
          placeholder="Type country"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
        />
      </div>
      {isOpen && (
        <div
          ref={optionsRef}
          className="z-10 absolute w-full mt-2 bg-white rounded-md shadow-lg"
        >
          <div className="max-h-80 overflow-auto">
            {filteredOptions.map((el) => (
              <label key={el} className="block px-4 py-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                  value={el}
                  checked={countries.includes(el)}
                  onChange={handleCountryChange}
                />
                <span className="ml-2 text-gray-700">{el}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(SelectCountries);
