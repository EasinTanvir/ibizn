import { baseUrl } from "@/src/config/serverConfig";
import { userContext } from "@/src/storage/contextApi";
import { truncateText } from "@/utils/truncateText";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

const FacilityFilter = () => {
  const [facilities, setFacilities] = useState([]);
  const names = facilities?.map((facility) => facility.name);
  const [facility, setFacility] = React.useState([]);
  const { searchValues, setSearchValues } = useContext(userContext);
  const [label, setLabel] = React.useState(false);
  console.log(searchValues);

  const [selectedFacility, setSelectedFacility] = useState();

  console.log(selectedFacility);
  const handleChange = (event) => {
    if (
      searchValues?.tabValue === "Resorts" ||
      searchValues?.property === "resort"
    ) {
      setSearchValues({
        ...searchValues,
        facility: event.target.value,
      });
    }

    setLabel(!label);

    const {
      target: { value },
    } = event;
    setFacility(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    fetch(
      `${baseUrl}/${
        searchValues?.tabValue === "Resorts" ||
        searchValues?.property === "resort"
          ? "resort-facilities"
          : "boat-facilities"
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchValues]);

  return (
    <div className="">
      <FormControl className="w-32">
        <InputLabel
          id="demo-multiple-checkbox-label"
          className={`text-primary ${!label ? "-mt-[7px]" : " mt-0 "}  `}
        >
          Facilities
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={facility}
          onChange={handleChange}
          input={<OutlinedInput label="Facilities" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
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
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={facility.indexOf(name) > -1} />
              <Tooltip title={name}>
                <ListItemText primary={truncateText(name)} />
              </Tooltip>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FacilityFilter;
