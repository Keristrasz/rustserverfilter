import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
} from "react";

import { countriesOptions } from "@/constants/formInputOptions";

interface SelectCountriesProps {
  id: string;
  countries: string[];
  setCountries: React.Dispatch<React.SetStateAction<string[]>>;
}

function FormSelectCountries({
  id,
  countries,
  setCountries,
}: SelectCountriesProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const optionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //@ts-ignore
    document.addEventListener("click", handleOutsideClick);

    return () => {
      //@ts-ignore
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };

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
    setCountries((prevSelected: string[]) => prevSelected.filter((c) => c !== country));
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

  const filteredOptions = countriesOptions.filter((country) =>
    country.name.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <div
        className="border border-black py-0.5 px-1.5 text-left bg-zinc-700 rounded-md shadow-sm cursor-pointer flex flex-wrap"
        onClick={handleToggle}
      >
        {countries.length > 0 &&
          countries.map((country) => (
            <span
              key={country}
              className="px-2 py-0 m-2 bg-rustOne text-gray-200 rounded-md flex items-center"
              onClick={() => handleRemoveCountry(country)}
            >
              {country} &#10005;
            </span>
          ))}
        <div className="flex-grow flex items-center">
          <input
            type="text"
            id={id}
            name={id}
            className="bg-transparent focus:outline-none border-none focus:ring-0 w-full"
            placeholder="Type country"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={inputRef}
          />
        </div>
      </div>
      {isOpen && (
        <div
          ref={optionsRef}
          className="z-50 absolute w-full mt-2 bg-zinc-700 rounded-md shadow-lg"
        >
          <div className="max-h-80 overflow-auto">
            {filteredOptions.map((el) => (
              <label
                key={String(el.name)}
                className="block px-4 py-2 cursor-pointer select-none"
              >
                <input
                  id={String(el.name) + id}
                  name={String(el.name) + id}
                  type="checkbox"
                  className="h-4 w-4 border-rustOne rounded focus:ring-2 focus:ring-black text-rustOne !bg-none"
                  value={String(el.name)}
                  checked={countries.includes(String(el.name))}
                  onChange={handleCountryChange}
                />
                <span className="ml-2 text-gray-200">{el.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormSelectCountries;
