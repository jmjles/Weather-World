import { Grid, Typography as Font } from "@mui/material";

const TitleBar = ({ title = "Weather World", city }: Props) => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Font align="center">{title}</Font>
      </Grid>
      <Grid item>
        <Font align="center">{city}</Font>
      </Grid>
    </Grid>
  );
};

type Props = {
  title?: string;
  city: string;
};

export default TitleBar;
