import { Grid, Switch, Stack, Typography as Font } from "@mui/material";
const Bar = (props: Props) => {
  const { setCelsius, celsius } = props;

  return (
    <Grid container justifyContent="space-around">
      <Grid item visibility="hidden">
        <Stack direction="row" spacing={1} alignItems="center">
          <Font>F°</Font>
          <Switch />
          <Font>C°</Font>
        </Stack>
      </Grid>
      <Grid item visibility="hidden">
        <Stack direction="row" spacing={1} alignItems="center">
          <Font>F°</Font>
          <Switch />
          <Font>C°</Font>
        </Stack>
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Font>F°</Font>
          <Switch
            checked={celsius}
            onChange={(v) => setCelsius(v.target.checked)}
          />
          <Font>C°</Font>
        </Stack>
      </Grid>
    </Grid>
  );
};

type Props = {
  setCelsius: React.Dispatch<React.SetStateAction<boolean>>;
  celsius: boolean;
};

export default Bar;
