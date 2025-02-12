import { Grid } from "@mui/material";
import WeatherCard from "../weatherCard/WeatherCard.tsx";
import { WeatherFormatted } from "../utils/index.ts";

const Forecast = ({ Days, celsius }: Props) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      style={{ marginTop: 12, marginBottom: 12 }}
    >
      {Days.map((day) => (
        <Grid item key={day.day}>
          <WeatherCard {...day} celsius={celsius} />
        </Grid>
      ))}
    </Grid>
  );
};
type Props = {
  Days: WeatherFormatted[];
  celsius: boolean;
};
export default Forecast;
