import { Grid } from "@mui/material";
import { Day } from "../../types";
import WeatherCard from "../weatherCard/WeatherCard.tsx";

const Forcast = ({ Days }: props) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {Days.map((day) => (
        <Grid item key={day.day}>
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
