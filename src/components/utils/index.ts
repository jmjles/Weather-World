import axios, { AxiosResponse } from "axios";
import { WeatherNameType, WeatherResponse, WeatherType } from "../../types";
const { DateTime } = require("luxon");
const api = "d74895cbc352ffdb395938590bc15b01";

export const getIcon = (code: string) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

const weather = axios.create({
  baseURL: "https://api.openweathermap.org/",
  params: { appid: api },
});

export const getLocs = (query: string) =>
  weather.get("geo/1.0/direct", { params: { q: query, limit: 5 } });

export const getForecast = (
  lat: number,
  lon: number
): Promise<AxiosResponse<WeatherResponse>> =>
  weather.get("data/2.5/forecast", {
    params: { lat, lon, units: "imperial" },
  });

export const createWeather = (weather: WeatherType[]): WeatherFormatted[] => {
  const days: Record<string, WeatherType[]> = {};
  const formattedDays: WeatherFormatted[] = [];
  weather.forEach((w) => {
    const date = DateTime.fromFormat(w.dt_txt, "yyyy-MM-dd TT").toFormat(
      "yyyy/LL/dd"
    );
    const day = days[date];
    if (!day) {
      days[date] = [w];
      return;
    }
    day.push(w);
  });

  Object.keys(days).forEach((d, i) => {
    const currentDay = days[d];
    const newDay: WeatherFormatted = {
      code: "01n",
      cTemp: "",
      day: DateTime.now().plus({ days: i }).weekdayLong,
      high: "",
      low: "",
      percent: "",
      weather: "Clear",
    };
    let precipitation = false;
    currentDay.forEach((d, i) => {
      if (parseNum(newDay.low) > d.main.temp_min || i === 0)
        newDay.low = `${parseNum(`${d.main.temp_min}`)}°F`;

      if (parseNum(newDay.high) < d.main.temp_max || i === 0)
        newDay.high = `${parseNum(`${d.main.temp_max}`)}°F`;

      if (parseNum(newDay.percent) < d.pop || i === 0)
        newDay.percent = `${d.pop * 100}%`;

      if (!precipitation && d.weather[0].main !== "Clear") {
        precipitation = true;
        newDay.weather = d.weather[0].main;
        newDay.code = d.weather[0].icon;
        newDay.cTemp = `${parseNum(`${d.main.temp}`)}°F`;
      }
    });
    formattedDays.push(newDay);
  });
  return formattedDays;
};

export interface WeatherFormatted {
  day: string;
  cTemp: string;
  low: string;
  high: string;
  percent: string;
  code: string;
  weather: WeatherNameType;
}
export const getLocationName = (
  name: string,
  state: string | undefined,
  country: string
) => (state ? `${name}, ${state}, ${country}` : `${name}, ${country}`);

export const parseNum = (N: string) =>
  Number.parseFloat(Number.parseFloat(N).toFixed(0));

export const convertTemp = (F: number) =>
  `${Number(((F - 32) * 5) / 9).toFixed(0)}°C`;
