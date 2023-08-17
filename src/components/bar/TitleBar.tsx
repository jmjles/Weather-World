import { Grid } from "@mui/material";

const TitleBar = ({ title = "Weather World", city }: Props) => {
  return (
    <Grid container>
      <Grid item>{title}</Grid>
      <Grid item>{city}</Grid>
    </Grid>
  );
};

type Props = {
  title?: string;
  city: string;
};

export default TitleBar;
