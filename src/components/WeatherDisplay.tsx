import { roundNumbers } from "../utils/formatting";
import { WiHumidity, WiWindy } from "react-icons/wi";
import { WeatherResponse } from "../utils/types";

interface WeatherDisplayProps {
  data: WeatherResponse;
  cityName: string;
}

const WeatherDisplay = ({ data, cityName }: WeatherDisplayProps) => {
  return (
    <div className=''>
      <div className='flex justify-center mb-20 '>
        <h2 className='text-4xl font-semibold'>
          {data.name === cityName || cityName === "" ? data.name : cityName}
        </h2>
      </div>
      <div className='flex'>
        <div className='flex flex-col items-center'>
          <p className='text-[200px] mb-[-25px] mt-[-120px] font-semibold'>
            {roundNumbers(data.main.temp)}&deg;
          </p>
          <p className='text-5xl font-light mr-15'>{data.weather[0].main}</p>
        </div>
        <div className='text-xl pt-10 '>
          <div className='flex items-center gap-2'>
            <WiWindy size={30} />
            <p className=''>{Math.floor(data.wind.speed * 10) / 10} m/s</p>
          </div>
          <div className='flex items-center gap-2'>
            <WiHumidity size={30} />
            <p>{data.main.humidity} %</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
