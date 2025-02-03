import { ForecastData } from "../utils/types";
import { roundNumbers, formatDay } from "../utils/formatting";

interface ForecastDisplayProps {
  forecast: ForecastData[];
}
const ForecastDisplay = ({ forecast }: ForecastDisplayProps) => {
  return (
    <div className='grid grid-cols-3 gap-5 md:grid-cols-5 sm:grid-cols-4'>
      {forecast.map((day: ForecastData, i: number) => (
        <div
          key={i}
          className='flex flex-col items-center space-y-2 border-1 border-primary/75 p-5 rounded-box w-[80px]'
        >
          <p className='font-semibold'>{formatDay(day.dt)}</p>
          <p className='text-2xl'>{roundNumbers(day.main.temp_max)}&deg;</p>
          <p className='font-semibold text-sm opacity-40'>
            {day.weather[0].main}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ForecastDisplay;
