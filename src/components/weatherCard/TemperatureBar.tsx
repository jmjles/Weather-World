import { Grid } from "@mui/material";
import Temperature from "./Temperature.tsx";
const TemperatureBar = ({ spacing, low, perc, high, celsius }: Props) => {
  return (
    <Grid
      container
      justifyContent="space-around"
      wrap="nowrap"
      spacing={spacing}
      marginBottom={0}
    >
      <Grid item>
        <Temperature title="Low" content={low} celsius={celsius} />
      </Grid>
      <Grid item>
        <Temperature title="Rain" content={perc} celsius={celsius} />
      </Grid>
      <Grid item>
        <Temperature title="High" content={high} celsius={celsius} />
      </Grid>
    </Grid>
  );
};
type Props = {
  spacing: number;
  low: string;
  perc: string;
  high: string;
  celsius: boolean;
};
export default TemperatureBar;
