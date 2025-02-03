export interface ForecastData {
  dt: number;
  main: {
    temp_max: number;
  };
  weather: Array<{
    main: string;
  }>;
}

export interface ForecastResponse {
  list: ForecastData[];
}

export interface CityData {
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
  }>;
  wind: {
    speed: number;
  };
}
