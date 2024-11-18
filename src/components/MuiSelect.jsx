import React, { useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
const MuiSelect = () => {
  const [country, setCountry] = useState([]);
  const handlechange = (e) => {
    const value = e.target.value;
    setCountry(typeof value === "string" ? value.split(',') : value);
  };
  return (
    <>
      <Box width="250px">
        <TextField
          label="Select Country"
          select
          value={country}
          onChange={handlechange}
          fullWidth
          SelectProps={{multiple : true}}
          size="small"
          color="secondary"
          helperText="Please select country"
        >
          <MenuItem value="IN">India</MenuItem>
          <MenuItem value="US">USA</MenuItem>
          <MenuItem value="AU">Australia</MenuItem>
        </TextField>
      </Box>
    </>
  );
};

export default MuiSelect;
