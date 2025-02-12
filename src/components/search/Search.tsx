import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { Location, Search as SearchProps } from "../../types";
import { getLocationName } from "../utils";
import { useState } from "react";
const Search = ({
  handleChange,
  handleSubmit,
  locations,
  handleLocation,
  query,
  selected,
  loading,
  fetchError,
}: props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (!locations.length) setOpen(false);
    else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      spacing={2}
      component="form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Grid item>
        {locations.length > 0 ? (
          <Autocomplete
            fullWidth
            disableClearable
            options={locations}
            getOptionLabel={(l: Location) => {
              return getLocationName(l.name, l.state, l.country);
            }}
            isOptionEqualToValue={(option, val) =>
              option.lat === val.lat && option.lon === val.lon
            }
            onChange={(e, val: Location) => handleLocation(val ? val : null)}
            inputValue={query}
            value={selected}
            open={open}
            onClose={handleOpen}
            onOpen={handleOpen}
            noOptionsText="Hit enter to search"
            loading={loading}
            onInputChange={(e, val) => {
              handleChange(val);
            }}
            sx={{ minWidth: 325 }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Enter a city name"
                fullWidth
                error={fetchError.length ? true : false}
                helperText={fetchError}
                required
                label="Search"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        ) : (
          <TextField
            placeholder="Enter a city name"
            fullWidth
            value={query}
            error={fetchError.length ? true : false}
            onChange={(e) => handleChange(e.target.value)}
            helperText={fetchError}
            required
            label="Search"
            InputProps={{
              type: "search",
            }}
          />
        )}
      </Grid>
      <Grid item>
        <Button variant="contained" type="submit">
          Search
        </Button>
      </Grid>
    </Grid>
  );
};
interface props extends SearchProps {
  loading: boolean;
  fetchError: string;
}
export default Search;
