import axios from "axios";
import { dayTimes, skyColor } from "../../theme";
const { DateTime } = require("luxon");
const api = "d74895cbc352ffdb395938590bc15b01";

export const getIcon = (code: string) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

const weather = axios.create({
  baseURL: "http://api.openweathermap.org/",
  params: { appid: api },
});

export const getLocs = (query: string) =>
  weather.get("geo/1.0/direct", { params: { q: query, limit: 5 } });

export const getForecast = (lat: number, lon: number) =>
  weather.get("data/2.5/forecast", {
    params: { lat, lon, units: "imperial", cnt: 6 },
  });

export const formatForecastWeather = (weather: any, day: number) => {
  return {
    day: DateTime.now().plus({ days: day }).weekdayLong,
    cTemp: `${parseNum(weather.main.temp)}°F`,
    low: `${parseNum(weather.main.temp_min)}°F`,
    high: `${parseNum(weather.main.temp_max)}°F`,
    perc: `${weather.pop}%`,
    code: weather.weather[0].icon,
    weather: weather.weather[0].main,
  };
};

export const getLocationName = (
  name: string,
  state: string | undefined,
  country: string
) => (state ? `${name}, ${state}, ${country}` : `${name}, ${country}`);

export const getDayColor = () => {
  const time = Number(
    DateTime.now()
      .toLocaleString({
        hour12: false,
        timeStyle: "short",
      })
      .replace(":", "")
  );

  if (dayTimes.night <= time && time < dayTimes.sunrise) return skyColor.black;
  if (dayTimes.sunrise <= time && time < dayTimes.day) return skyColor.orange;
  if (dayTimes.day <= time && time < dayTimes.evening) return skyColor.blue;
  if (dayTimes.evening <= time && time < dayTimes.night) return skyColor.orange;
};

export const parseNum = (N: string) =>
  Number.parseFloat(Number.parseFloat(N).toFixed(0));

export const convertTemp = (F: number) =>
  `${Number(((F - 32) * 5) / 9).toFixed(0)}°C`;
