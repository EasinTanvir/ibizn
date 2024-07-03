import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const ResortStyle = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        sx={{
          width: { xs: "100%", sm: 140, position: "relative" },
        }}
      >
        <InputLabel
          className="text-primary"
          id="demo-simple-select-label"
          sx={{ position: "absolute", top: "-7px" }}
        >
          Resort Style
        </InputLabel>
        <Select
          className="text-primary"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Diving Type"
          onChange={handleChange}
          size="small"
          sx={{
            height: 40,
            display: "flex",
            alignItems: "center",
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: "5px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0080ff",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0080ff",
            },
            "& .MuiSelect-icon": {
              color: "#0080ff",
            },
          }}
        >
          <MenuItem value={10}>Beach Resort</MenuItem>
          <MenuItem value={20}>Mountain Resort</MenuItem>
          <MenuItem value={30}>Tropical Island Resort</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ResortStyle;
