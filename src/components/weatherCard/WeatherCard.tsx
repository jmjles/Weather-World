import {
  Card,
  CardContent,
  CardMedia,
  Typography as Font,
} from "@mui/material";
import { Day } from "../../types.ts";
import TempatureBar from "./TempatureBar.tsx";
import { getIcon } from "../utils/index.ts";

const WeatherCard = ({ day, cTemp, low, high, perc, weather, code }: Day) => {
  return (
    <Card>
      <Font variant="h5" align="center" marginBottom={2}>
        {day}
      </Font>
      <CardMedia
        component="img"
        image={getIcon(code)}
        height="80"
        sx={{ width: 80, marginLeft: "auto", marginRight: "auto" }}
        alt={`${weather} icon`}
      />
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
