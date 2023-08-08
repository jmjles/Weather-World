import { Typography as Font } from "@mui/material";
import quotes from "../assets/quotes.ts";
import { Day } from "../../types.ts";
import { useEffect, useState } from "react";
const Quote = ({ day }: props) => {
  const [num, setNum] = useState(0);
  useEffect(() => {
    setNum(Math.floor(Math.random() * 9));
  }, [day]);

  return (
    <div>
      <Font>
        <Font component="span" variant="h3">
          "
        </Font>
        {quotes["Cloudy"][num]}
        <Font component="span" variant="h3">
          "
        </Font>
      </Font>
    </div>
  );
};
type props = {
  day: Day;
};
export default Quote;
