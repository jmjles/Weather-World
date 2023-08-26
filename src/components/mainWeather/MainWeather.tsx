import { Grid, Typography as Font } from "@mui/material";
import { Day, Location } from "../../types";
import TemperatureBar from "../weatherCard/TemperatureBar.tsx";
import Quote from "./Quote.tsx";
import { convertTemp, getIcon, parseNum } from "../utils/index.ts";

const MainWeather = ({ day, selected, celsius }: props) => {
  return (
    <Grid container direction="column" alignItems="center">
      {selected && (
        <>
          <Grid item>
            <Font variant="h1" marginBottom="12px" align="center">
              {selected.name}
            </Font>
          </Grid>
          <Grid item>
            <img src={getIcon(day.code)} width="180px" height="180px" />
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
        </>
      )}
    </Grid>
  );
};
type props = {
  day: Day;
  selected: Location;
  celsius: boolean;
};
export default MainWeather;
