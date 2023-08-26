import { Card, Container, Grid } from "@mui/material";
import Forecast from "./components/forecast/Forecast.tsx";
import MainWeather from "./components/mainWeather/MainWeather.tsx";
import { useEffect, useState } from "react";
import { Day, Location } from "./types.ts";
import {
  formatForecastWeather,
  getDayColor,
  getForecast,
  getLocs,
} from "./components/utils/index.ts";
import Main from "./components/main/Main.tsx";
import axios, { AxiosError } from "axios";
import { skyColor } from "./theme.ts";
import Bar from "./components/bar/Bar.tsx";
import TitleBar from "./components/bar/TitleBar.tsx";

const App = () => {
  const [query, setQuery] = useState("thousand oaks");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState<Location>();
  const [loading, setLoading] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [data, setData] = useState<Day | undefined>();
  const [forecastData, setForecastData] = useState([]);
  const [color, setColor] = useState(skyColor.black);
  const [news, setNews] = useState(false);
  const [celsius, setCelsius] = useState(false);
  const getLocations = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await getLocs(query);
      if (res.status === 200) {
        const uni: any = {};
        setFetchError("");
        const filtered: Location[] = res.data.filter((loc: Location) => {
          const key = `${loc.name}, ${loc.state}, ${loc.country}`;
          const cached = uni[key];
          if (!cached) {
            uni[key] = 1;
            return loc;
          }
        });
        if (filtered.length === 0) {
          setFetchError("No cities found.");
          setForecastData([]);
        }
        setLocations(filtered);
        const first = filtered[0];
        handleSelect(first);
      }
    } catch (er) {
      const error = er as Error | AxiosError;
      setLoading(false);
      setLocations([]);
      setData(undefined);
      setSelected(undefined);
      setForecastData([]);
      let message = "";
      if (axios.isAxiosError(error)) {
        // errors here
      } else message = "There was an internal error";
      setFetchError(message);
    }
  };
  const handleSelect = (val: Location) => {
    setSelected(val);
  };
  const handleChange = (val: string) => {
    setQuery(val);
  };

  useEffect(() => {
    if (selected) {
      const getWeather = async () => {
        try {
          setLoadingWeather(true);
          const res2 = await getForecast(selected.lat, selected.lon);
          setLoadingWeather(false);
          if (res2.status === 200) {
            const formatted = res2.data.list.map((d: any, i: number) =>
              formatForecastWeather(d, i)
            );
            setData(formatted[0]);
            setForecastData(formatted.slice(1));
          }
        } catch {}
      };
      getWeather();
    }
  }, [selected]);

  // Gets current time of day and sets background accordingly
  useEffect(() => {
    if (!selected) {
      setColor(getDayColor());
    }
  });
  return (
    <div style={{ backgroundColor: color, width: "100vw", height: "100vh" }}>
      <Container
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Card
          style={{
            height: "85vh",
            overflowY: "auto",
            overflowX: "hidden",
            opacity: "85%",
          }}
        >
          <Bar
            celsius={celsius}
            setCelsius={setCelsius}
            news={news}
            setNews={setNews}
          />
          <Grid
            container
            justifyContent="center"
            direction="row"
            style={{ height: selected ? "unset" : "100%" }}
          >
            <Grid alignSelf="center" item flexGrow={1}>
              <Main
                handleSubmit={getLocations}
                locations={locations}
                query={query}
                selected={selected}
                handleLocation={setSelected}
                handleChange={handleChange}
                handleSelect={handleSelect}
                fetchError={fetchError}
                loading={loading}
              />
            </Grid>
            {data && (
              <Grid item flexGrow={1}>
                <MainWeather day={data} selected={selected} celsius={celsius} />
              </Grid>
            )}
          </Grid>
          {data && <Forecast Days={forecastData} celsius={celsius} />}
        </Card>
      </Container>
    </div>
  );
};
export default App;
