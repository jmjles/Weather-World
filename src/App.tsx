import {
  Card,
  Container,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";
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
import Bar from "./components/bar/Bar.tsx";
import Loading from "./components/loading/Loading.tsx";
import Colors from "./components/assets/skyColors.ts";
import anime from "animejs/lib/anime.es";

const App = () => {
  const [query, setQuery] = useState("thousand oaks");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState<Location>();
  const [loading, setLoading] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [data, setData] = useState<Day | undefined>();
  const [forecastData, setForecastData] = useState([]);
  const [color, setColor] = useState(Colors["Clouds"]["Day"]);
  const [prevColor, setPrevColor] = useState(color);
  const [textColor, setTextColor] = useState(color.textColor);
  const [backgroundColor, setBackgroundColor] = useState(color.backgroundColor);
  const [borderColor, setBorderColor] = useState(color.borderColor);
  const [celsius, setCelsius] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const getLocations = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
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
        handleSelect(filtered[0]);
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
          if (res2.status === 200) {
            const formatted = res2.data.list.map((d: any, i: number) =>
              formatForecastWeather(d, i)
            );
            setData(formatted[0]);
            setForecastData(formatted.slice(1));
          }
          setLoading(false);
        } catch {}
      };
      getWeather();
    }
    if (fetchError) setData(undefined);
  }, [selected]);

  useEffect(() => {
    if (loading || loadingWeather) {
      setShowLoading(true);
      const t = setTimeout(() => {
        setShowLoading(false);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [loading, loadingWeather]);

  // Gets current time of day and sets background accordingly
  useEffect(() => {
    if (!selected) setColor(getDayColor());
    else if (data) setColor(getDayColor(data.weather));
  });

  useEffect(() => {
    let c = prevColor;
    anime({
      targets: c,
      backgroundColor: color.backgroundColor,
      textColor: color.textColor,
      borderColor: color.borderColor,
      easing: "linear",
      duration: 500,
      update: () => {
        setBackgroundColor(c.backgroundColor);
        setBorderColor(c.borderColor);
        setTextColor(c.textColor);
      },
      complete: () => {
        if (color.backgroundColor !== c.backgroundColor) setPrevColor(color);
      },
    });
  }, [color]);
  const theme = createTheme({
    typography: {
      allVariants: {
        color: textColor,
      },
      h1: { fontSize: 64 },
      h2: { fontSize: 36 },
      subtitle1: { fontSize: 12 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderColor: borderColor,
            backgroundColor: backgroundColor,
          },
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          PaperComponent: (props) => (
            <Paper sx={{ backgroundColor, color: textColor, borderColor }}>
              {props.children}
            </Paper>
          ),
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: textColor,
            backgroundColor,
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: "rgba(242, 242, 242, 1)",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Container
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Card
            id="card"
            sx={{
              height: "85vh",
              overflowY: data && !showLoading ? "auto" : "hidden",
              overflowX: "hidden",
              opacity: "85%",
              position: "relative",
            }}
          >
            <Loading show={showLoading} />
            <Bar celsius={celsius} setCelsius={setCelsius} />
            <Grid
              container
              justifyContent="center"
              direction="row"
              overflow="hidden"
              style={{ height: selected ? "unset" : "calc(100% - 38px )" }}
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
                {data && (
                  <Typography align="center" id="msg">
                    *Not actual daily weather due to API restriction
                  </Typography>
                )}
              </Grid>
              {data && (
                <Grid item flexGrow={1}>
                  <MainWeather
                    day={data}
                    selected={selected}
                    celsius={celsius}
                  />
                </Grid>
              )}
            </Grid>
            {data && <Forecast Days={forecastData} celsius={celsius} />}
          </Card>
        </Container>
      </div>
    </ThemeProvider>
  );
};
export default App;
