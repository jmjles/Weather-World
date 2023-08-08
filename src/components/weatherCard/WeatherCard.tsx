import {
  Card,
  CardContent,
  CardMedia,
  Typography as Font,
  Grid,
} from "@mui/material";
import Tempature from "./Tempature.tsx";
import { Day } from "../../types.ts";
import TempatureBar from "./TempatureBar.tsx";

const WeatherCard = ({ day, cTemp, low, high, perc, weather }: Day) => {
  return (
    <Card>
      <Font variant="h5" align="center" marginBottom={2}>
        {day}
      </Font>
      <CardMedia />
      <CardContent>
        <Font variant="h4" align="center" marginBottom={2}>
          {cTemp}
        </Font>
        <TempatureBar spacing={2} {...{ low, high, perc }} />
      </CardContent>
    </Card>
  );
};
export default WeatherCard;
