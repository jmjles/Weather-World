import { Grid, Typography as Font } from "@mui/material";

const Tempature = ({ title, image, alt, content }: props) => {
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
          {content}
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
};
export default Tempature;
