import { Card, Grid, Typography as Font } from "@mui/material";
import Weather from "react-animated-weather";
import { useEffect, useState } from "react";
import anime from "animejs/lib/anime.es";
import icons from "../assets/icons";
import loadingMessages from "../assets/loadingMessages";
const Loading = ({ show }: Props) => {
  const [icon, setIcon] = useState("CLEAR_DAY");
  const [msg, setMsg] = useState(loadingMessages[0]);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    if (show) {
      setMsg(
        loadingMessages[Math.floor(Math.random() * loadingMessages.length - 1)]
      );
      let pointer = 0;
      if (!animated) {
        setAnimated(true);
        anime({
          targets: ".icon",
          duration: 100,
          delay: 1000,
          endDelay: 100,
          easing: "linear",
          opacity: [1, 0],
          loop: true,
          direction: "alternate",
          update: (ani) => {
            if (ani.progress === 100) {
              if (pointer + 1 === icons.length) pointer = 0;
              else pointer++;
              setIcon(icons[pointer]);
            }
          },
        });
      }
    }
  }, [show]);
  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        display: show ? "block" : "none",
        zIndex: 99,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
        }}
      >
        <Font marginBottom={2} fontSize={32}>
          {msg}
        </Font>
        <div className="icon">
          <Weather icon={icon} />
        </div>
      </div>
    </Card>
  );
};
type Props = {
  show: boolean;
};
export default Loading;
