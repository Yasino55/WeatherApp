# Weather App

A modern weather application that provides real-time weather information and forecasts for locations worldwide.

## Features

- Real-time weather data display with current temperature, humidity, and wind speed
- 5-day weather forecast
- Location-based weather detection using browser geolocation
- City search functionality with auto-complete suggestions
- Clean and responsive UI built with Tailwind CSS
- Dynamic weather updates based on selected location
- Celsius temperature units

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Programming Language**: TypeScript
- **APIs**:
  - OpenWeather API (weather data)
  - OpenWeather Geocoding API (location search)
- **Libraries**:
  - React Icons (weather icons)
  - React Spinners (loading animations)

## Environment Variables

To run this project, you need to add the following environment variables to your `.env` file:

```env
VITE_OPENWEATHER_URL=https://api.openweathermap.org/data/2.5/
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your API keys
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Integration

The app uses two main OpenWeather API endpoints:

- Current weather data
- 5-day forecast with 3-hour intervals

## Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx
│   ├── WeatherDisplay.tsx
│   └── ForecastDisplay.tsx
├── services/
│   └── api/
│       ├── requests.ts
│       └── geoLocation.ts
└── utils/
    ├── formatting.ts
    └── types.ts
```
