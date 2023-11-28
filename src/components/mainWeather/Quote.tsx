import { Typography as Font } from "@mui/material";
import quotes from "../assets/quotes.ts";
import { Day } from "../../types.ts";
import { useEffect, useState } from "react";
const Quote = ({ day }: props) => {
  const [num, setNum] = useState(0);
  const random = () => Math.floor(Math.random() * 9);
  useEffect(() => {
    let randomNum = random();
    while (randomNum === num) {
      randomNum = random();
    }
    setNum(randomNum);
  }, [day]);

  return (
    <div>
      <Font>{quotes[day.weather][num] || ""}</Font>
    </div>
  );
};
type props = {
  day: Day;
};
export default Quote;
