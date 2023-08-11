import { Grid, Typography as Font } from "@mui/material";
import { Day, Location } from "../../types";
import TempatureBar from "../weatherCard/TempatureBar.tsx";
import Quote from "./Quote.tsx";
import { getIcon } from "../utils/index.ts";

const MainWeather = ({ day, selected }: props) => {
  return (
    <Grid container direction="column" alignItems="center" maxWidth="50%">
      {selected && (
        <>
          <Grid item>
            <Font variant="h1" marginBottom="12px" align="center">
              {selected.name}
            </Font>
          </Grid>
          <Grid item>
            <img src={getIcon(day.code)} width="100px" height="100px" />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Font variant="h3" fontWeight="Bold" align="center">
                  {day.cTemp}
                </Font>
              </Grid>
              <Grid item>
                <TempatureBar {...day} spacing={5} />
              </Grid>
              <Grid item>
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
};
export default MainWeather;
