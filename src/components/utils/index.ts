import axios from "axios";
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

export const getForcast = (lat: number, lon: number) =>
  weather.get("data/2.5/forecast", {
    params: { lat, lon, units: "imperial", cnt: 6 },
  });

export const formatForcastWeather = (weather: any, day: number) => {
  return {
    day: DateTime.now().plus({ days: day }).weekdayLong,
    cTemp: `${weather.main.temp}°F`,
    low: `${weather.main.temp_min}°F`,
    high: `${weather.main.temp_max}°F`,
    perc: `${weather.pop}%`,
    weather: weather.weather[0].main,
  };
};
