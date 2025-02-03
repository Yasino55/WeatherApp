import { useEffect, useState } from "react";
import { fetchForecast, fetchWeather } from "./services/api/requests";
import { getCityName, getUserLocation } from "./services/api/geoLocation";
import { CityData, ForecastData, WeatherResponse } from "./utils/types";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import MoonLoader from "react-spinners/MoonLoader";

function App() {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [input, setInput] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 52.371807, longitude: 4.896029 });

  const lat = location.latitude;
  const lon = location.longitude;

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (input.trim() !== "") {
        const data = await getCityName(input);

        setSuggestions(data);
        // console.log(data);
      } else {
        setSuggestions([]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to get the user's location
        const userLocation = await getUserLocation();
        setLocation(userLocation);
      } catch (error) {
        console.log("Using default coordinates", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather data using the current location (user or default)
        const weatherData = await fetchWeather(lat, lon);
        const weatherForecast = await fetchForecast(lat, lon);

        console.log(weatherForecast);
        setData(weatherData);
        setForecast(weatherForecast);
      } catch (err) {
        console.log("Failed to fetch weather data.");
        console.error(err);
      }
    };

    fetchData();
  }, [location, lat, lon]);

  const handleChange = (value: string) => {
    setInput(value);
  };

  const handleClick = (city: CityData) => {
    setLocation({ latitude: city.lat, longitude: city.lon });
    setCityName(city.name);
    setSuggestions([]);
  };

  if (!data) {
    return (
      <div className='flex h-svh justify-center items-center '>
        <MoonLoader size={100} color='#474747' />;
      </div>
    );
  }

  // console.log(data);

  return (
    <div className='space-y-10'>
      <h1 className='text-2xl font-semibold'>Weather</h1>
      <div className='flex flex-col justify-center items-center gap-10'>
        <SearchBar
          input={input}
          suggestions={suggestions}
          onInputChange={handleChange}
          onCitySelect={handleClick}
        />
        <WeatherDisplay data={data} cityName={cityName} />
        <ForecastDisplay forecast={forecast} />
      </div>
    </div>
  );
}

export default App;
