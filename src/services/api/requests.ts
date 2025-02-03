import { groupForecastByDay } from "../../utils/formatting";
import { ForecastData, ForecastResponse } from "../../utils/types";

const BASE_URL = import.meta.env.VITE_OPENWEATHER_URL;
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeather = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchForecast = async (
  lat: number,
  lon: number
): Promise<ForecastData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch forecast data.");
    }

    const data = (await response.json()) as ForecastResponse;
    const transformedData = data.list.map((item) => ({
      dt: item.dt,
      main: {
        temp_max: item.main.temp_max,
      },
      weather: [
        {
          main: item.weather[0].main,
        },
      ],
    }));

    return groupForecastByDay(transformedData);
  } catch (error) {
    console.log(error);
    return [];
  }
};
