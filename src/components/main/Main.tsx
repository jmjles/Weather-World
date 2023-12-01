import Globe, { GlobeMethods, GlobeProps } from "react-globe.gl";
import { Location, Search as SearchProps } from "../../types";
import Search from "../search/Search.tsx";
import { Typography as Font, Grid } from "@mui/material";
import { getLocationName } from "../utils/index.ts";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const Main = ({
  handleSubmit,
  handleChange,
  locations,
  handleLocation,
  query,
  selected,
  handleSelect,
  loading,
  fetchError,
}: Props) => {
  const [el, setEl] = useState(450);
  const [w, setW] = useState(450);
  const [h, setH] = useState(450);
  const [autoRotate, setAutoRotate] = useState(true);
  const globe: React.MutableRefObject<GlobeMethods> = useRef();

  const resize = () => {
    setEl(document.getElementById("card").clientHeight);
  };

  useLayoutEffect(() => {
    const x = el - el * 0.5;
    const y = el - el * 0.4;
    if (selected) {
      setW(x);
      setH(x);
    } else {
      setW(y);
      setH(y);
    }
  }, [el, selected]);

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (selected) {
      const center = { lat: selected.lat, lng: selected.lon, altitude: 0.4 };
      globe.current.pointOfView(center, 3000);
      setAutoRotate(false);
    }
  }, [selected]);
  // Auto-rotate
  useEffect(() => {
    globe.current.controls().autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    globe.current.controls().autoRotateSpeed = 0.2;
    globe.current.camera().zoom = 1.5;
    globe.current.camera().updateProjectionMatrix();
  }, []);

  const handleControl = () => {
    globe.current.controls().autoRotate = autoRotate;
    setAutoRotate((prev) => !prev);
  };

  const options: GlobeProps = {
    height: h,
    width: w,
    globeImageUrl: "//unpkg.com/three-globe/example/img/earth-night.jpg",
    backgroundColor: "rgba(0, 0, 0, 0)",
    labelsData: locations,
    labelLat: (l: Location) => l.lat,
    labelLng: (l: Location) => l.lon,
    labelText: (l: Location) => getLocationName(l.name, l.state, l.country),
    labelColor: () => "rgba(255, 255, 157, 1)",
    labelDotRadius: 0.5,
    onGlobeClick: () => handleControl(),
    onLabelClick: (label: Location) => handleSelect(label),
  };
  return (
    <div>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <Font variant="h1" marginBottom={2}>
            Weather World
          </Font>
        </Grid>
        <Grid item>
          <Globe ref={globe} {...options} />
        </Grid>
        <Grid item marginTop={4}>
          <Search
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            locations={locations}
            handleLocation={handleLocation}
            query={query}
            selected={selected}
            loading={loading}
            fetchError={fetchError}
          />
        </Grid>
      </Grid>
    </div>
  );
};
interface Props extends SearchProps {
  handleSelect: (val: Location) => void;
  loading: boolean;
  fetchError: string;
}
export default Main;
