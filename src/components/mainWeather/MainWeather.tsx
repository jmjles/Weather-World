import { Grid, Typography as Font } from "@mui/material";
import { Location } from "../../types";
import TemperatureBar from "../weatherCard/TemperatureBar.tsx";
import Quote from "./Quote.tsx";
import {
  WeatherFormatted,
  convertTemp,
  getIcon,
  parseNum,
} from "../utils/index.ts";
import Bar from "../bar/Bar.tsx";

const MainWeather = ({
  day,
  selected,
  celsius,
  setCelsius,
  loading,
}: props) => {
  return (
    <>
      <Font variant="h1" marginBottom="12px" align="center">
        {selected.name}
      </Font>
      {selected && (
        <Grid container direction="column" alignItems="center" id="MainWeather">
          <Grid item>
            <img src={getIcon(day.code)} width="300px" height="300px" />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Font variant="h3" fontWeight="Bold" align="center">
                  {celsius ? convertTemp(parseNum(day.cTemp)) : day.cTemp}
                </Font>
              </Grid>
              <Grid item>
                <TemperatureBar {...day} spacing={5} celsius={celsius} />
              </Grid>
              <Grid item marginTop={3}>
                <Quote day={day} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Bar
        celsius={celsius}
        setCelsius={setCelsius}
        display={!loading && day?.day?.length > 0}
      />
    </>
  );
};
type props = {
  day: WeatherFormatted;
  selected: Location;
  setCelsius: any;
  celsius: boolean;
  loading: boolean;
};
export default MainWeather;
