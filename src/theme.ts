import { createTheme } from "@mui/material";
export const skyColor = {
  blue: "#55a6f1",
  grey: "#dcebf9",
  black: "#060a0e",
  orange: "#ffcd70",
};
export const dayTimes = { sunrise: 500, day: 800, evening: 1800, night:2000 };
export const theme = createTheme({
  typography: {
    h1: { fontSize: 64 },
    h2: { fontSize: 36 },
    subtitle1: { fontSize: 12 },
  },
});
