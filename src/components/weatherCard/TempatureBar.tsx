import { Grid } from "@mui/material";
import Tempature from "./Tempature.tsx";
const TempatureBar = ({ spacing, low, perc, high }: props) => {
  return (
    <Grid
      container
      justifyContent="space-around"
      wrap="nowrap"
      spacing={spacing}
      marginBottom={0}
    >
      <Grid item>
        <Tempature title="Low" content={low} />
      </Grid>
      <Grid item>
        <Tempature title="Rain" content={perc} />
      </Grid>
      <Grid item>
        <Tempature title="High" content={high} />
      </Grid>
    </Grid>
  );
};
type props = {
  spacing: number;
  low: string;
  perc: string;
  high: string;
};
export default TempatureBar;
