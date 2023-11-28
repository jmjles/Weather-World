export type Day = {
  day: string;
  cTemp: string;
  low: string;
  high: string;
  perc: string;
  code: string;
  weather:
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
};

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
