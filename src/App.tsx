import { Card, Container, Grid } from "@mui/material";
import Forcast from "./components/forcast/Forcast.tsx";
import MainWeather from "./components/mainWeather/MainWeather.tsx";
import { useEffect, useState } from "react";
import { Day, Location } from "./types.ts";
import {
  formatForcastWeather,
  getForcast,
  getLocs,
} from "./components/utils/index.ts";
import Main from "./components/main/Main.tsx";
import axios, { AxiosError } from "axios";
import { dayTimes, skyColor } from "./theme.ts";
import { DateTime } from "luxon";

const App = () => {
  const [query, setQuery] = useState("thousand oaks");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState<Location>();
  const [loading, setLoading] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [data, setData] = useState<Day | undefined>();
  const [forcastData, setForcastData] = useState([]);
  const [color, setColor] = useState(skyColor.black);
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
          setForcastData([]);
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
      setForcastData([]);
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
          const res2 = await getForcast(selected.lat, selected.lon);
          setLoadingWeather(false);
          if (res2.status === 200) {
            const formatted = res2.data.list.map((d: any, i: number) =>
              formatForcastWeather(d, i)
            );
            setData(formatted[0]);
            setForcastData(formatted.slice(1));
          }
        } catch {}
      };
      getWeather();
    }
  }, [selected]);

  useEffect(() => {
    if (!selected) {
      const time = Number(
        DateTime.now()
          .toLocaleString({
            hour12: false,
            timeStyle: "short",
          })
          .replace(":", "")
      );
      if (dayTimes.night <= time && time < dayTimes.sunrise)
        setColor(skyColor.black);
      if (dayTimes.sunrise <= time && time < dayTimes.day)
        setColor(skyColor.orange);
      if (dayTimes.day <= time && time < dayTimes.evening)
        setColor(skyColor.blue);
      if (dayTimes.evening <= time && time < dayTimes.night)
        setColor(skyColor.orange);
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
          <Grid
            container
            justifyContent="center"
            direction="row"
            spacing={5}
            style={{ height: selected ? "unset" : "100%" }}
          >
            <Grid alignSelf="center" item>
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
              <Grid item>
                <MainWeather day={data} selected={selected} />
              </Grid>
            )}
          </Grid>

          {data && <Forcast Days={forcastData} />}
        </Card>
      </Container>
    </div>
  );
};
export default App;
