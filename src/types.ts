export type WeatherNameType =
  | "Clear"
  | "Snow"
  | "Rain"
  | "Drizzle"
  | "Clouds"
  | "Thunderstorm"
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Ash"
  | "Squall"
  | "Tornado";

export type Location = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
};

export type Search = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (val: string) => void;
  locations: Location[];
  handleLocation: React.Dispatch<React.SetStateAction<Location>>;
  query: string;
  selected: Location;
};

export type WeatherResponse = {
  cod: string;
  message: 0;
  cnt: 40;
  list: WeatherType[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export interface WeatherType {
  dt: number;
  main: MainWeatherType;
  weather: WeatherDescType[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export type MainWeatherType = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

export type WeatherDescType = {
  id: number;
  main: WeatherNameType;
  description: string;
  icon: string;
};
