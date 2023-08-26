import {
  Card,
  CardContent,
  CardMedia,
  Typography as Font,
} from "@mui/material";
import { Day } from "../../types.ts";
import TemperatureBar from "./TemperatureBar.tsx";
import { convertTemp, getIcon, parseNum } from "../utils/index.ts";

const WeatherCard = ({
  day,
  cTemp,
  low,
  high,
  perc,
  weather,
  code,
  celsius,
}: Props) => {
  return (
    <Card>
      <Font variant="h5" align="center" marginBottom={2}>
        {day}
      </Font>
      <CardMedia
        component="img"
        image={getIcon(code)}
        height="40"
        sx={{ width: 80, marginLeft: "auto", marginRight: "auto" }}
        alt={`${weather} icon`}
      />
      <CardContent>
        <Font variant="h4" align="center" marginBottom={2}>
          {celsius ? convertTemp(parseNum(cTemp)) : cTemp}
        </Font>
        <TemperatureBar spacing={2} {...{ low, high, perc, celsius }} />
      </CardContent>
    </Card>
  );
};
interface Props extends Day {
  celsius: boolean;
}
export default WeatherCard;
