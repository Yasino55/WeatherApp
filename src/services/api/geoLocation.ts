// const RAPID_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getUserLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getCityName = async (city: string) => {
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${OPEN_WEATHER_API_KEY}`,
      options
    );

    if (!response.ok) {
      console.log("Failed to fetch city name.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
