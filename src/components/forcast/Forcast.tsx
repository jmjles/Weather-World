import { Grid } from "@mui/material";
import { Day } from "../../types";
import WeatherCard from "../weatherCard/WeatherCard.tsx";

const Forcast = ({ Days }: props) => {
  return (
    <Grid container>
      {Days.map((day) => (
        <Grid item>
          <WeatherCard {...day} />
        </Grid>
      ))}
    </Grid>
  );
};
type props = {
  Days: Day[];
};
export default Forcast;
