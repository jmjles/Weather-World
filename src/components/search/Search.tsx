import { Autocomplete, Grid, TextField } from "@mui/material";
import { Location, Search as props } from "../../types";

const Search = ({
  handleChange,
  handleSubmit,
  locations,
  handleLocation,
  query,
  selected,
}: props) => {
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Autocomplete
              fullWidth
              disableClearable
              options={locations}
              getOptionLabel={(l: Location) => {
                return l.state
                  ? `${l.name}, ${l.state}, ${l.country}`
                  : `${l.name}, ${l.country}`;
              }}
              isOptionEqualToValue={(option, val) =>
                option.lat === val.lat && option.lon === val.lon
              }
              onChange={(e, val: Location) => handleLocation(val)}
              value={selected}
              inputValue={query}
              onInputChange={(e, val) => {
                handleChange(val);
              }}
              sx={{ minWidth: 325 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Enter City, Zipcode, or State"
                  fullWidth
                  label="Search"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default Search;
