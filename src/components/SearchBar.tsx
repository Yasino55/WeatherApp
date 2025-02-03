import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { CityData } from "../utils/types";

interface SearchBarProps {
  input: string;
  suggestions: CityData[];
  onInputChange: (value: string) => void;
  onCitySelect: (city: CityData) => void;
}

const SearchBar = ({
  input,
  suggestions,
  onInputChange,
  onCitySelect,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding the suggestions to allow click event to register
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  return (
    <div className='flex relative w-[250px]'>
      <label className='input'>
        <FiSearch size={20} className='opacity-50' />
        <input
          type='search'
          placeholder='City'
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className='text-lg font-semibold'
        />
      </label>
      {isFocused && suggestions.length > 0 && (
        <div className='border solid bg-base-100 space-y-1 rounded-md w-[250px] mt-10 overflow-y-scroll-hidden overflow-x-hidden absolute'>
          {suggestions.map((city, i) => (
            <div
              key={i}
              onClick={() => onCitySelect(city)}
              className='cursor-pointer text-lg font-semibold hover:bg-base-300 p-2 '
            >
              {city.name}, {city.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
