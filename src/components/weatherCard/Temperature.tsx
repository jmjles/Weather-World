import { Grid, Typography as Font } from "@mui/material";
import { convertTemp, parseNum } from "../utils";

const Temperature = ({ title, image, alt, content, celsius }: props) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        {image ? (
          <img src={image} alt={alt} />
        ) : (
          <Font variant="h5">{title}</Font>
        )}
      </Grid>
      <Grid item>
        <Font variant="subtitle2" fontWeight="Bold">
          {title !== "Rain" && celsius
            ? convertTemp(parseNum(content))
            : content}
        </Font>
      </Grid>
    </Grid>
  );
};
type props = {
  title?: string;
  image?: string;
  alt?: string;
  content: string;
  celsius: boolean;
};
export default Temperature;
