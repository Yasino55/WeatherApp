import { ForecastData } from "./types";

export const roundNumbers = (number: number) => {
  return Math.round(number);
};

export const formatIcon = (icon: string) => {
  return `http://openweathermap.org/img/wn/${icon}.png`;
};

export const formatDay = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });
};

export const groupForecastByDay = (
  forecastList: ForecastData[]
): ForecastData[] => {
  const today = new Date().toLocaleDateString();

  const dailyForecasts = forecastList.reduce(
    (acc: Record<string, ForecastData>, forecast: ForecastData) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      const hour = new Date(forecast.dt * 1000).getHours();

      if (date !== today) {
        if (!acc[date]) {
          acc[date] = { ...forecast };
        } else {
          // Update the max temperature if the current forecast has a higher temperature
          if (forecast.main.temp_max > acc[date].main.temp_max) {
            acc[date].main.temp_max = forecast.main.temp_max;
          }
          // Prioritize forecasts between 12 PM and 3 PM for other data
          if (hour >= 12 && hour <= 15) {
            acc[date] = { ...forecast, main: { ...acc[date].main } };
          }
        }
      }
      return acc;
    },
    {} as Record<string, ForecastData>
  );

  return Object.values(dailyForecasts);
};
