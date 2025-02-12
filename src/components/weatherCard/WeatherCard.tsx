import {
  Card,
  CardContent,
  CardMedia,
  Typography as Font,
} from "@mui/material";
import TemperatureBar from "./TemperatureBar.tsx";
import {
  WeatherFormatted,
  convertTemp,
  getIcon,
  parseNum,
} from "../utils/index.ts";

const WeatherCard = ({
  day,
  cTemp,
  low,
  high,
  percent,
  weather,
  code,
  celsius,
}: Props) => {
  return (
    <Card>
      <Font variant="h5" align="center" marginBottom={2}>
        {day}
      </Font>
      <div id="Wea">
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
          <TemperatureBar spacing={2} {...{ low, high, percent, celsius }} />
        </CardContent>
      </div>
    </Card>
  );
};
interface Props extends WeatherFormatted {
  celsius: boolean;
}
export default WeatherCard;
