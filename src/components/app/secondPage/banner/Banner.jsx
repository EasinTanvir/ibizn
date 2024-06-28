import React, { useContext, useEffect, useState } from "react";
import { userContext } from "@/src/storage/contextApi";
import { ArrowDropDown } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { InputAdornment, Typography } from "@mui/material";
import { useRouter } from "next/router";
import SearchItemModal from "../../Home/Banner/SearchItemModal";
import { baseUrl } from "@/src/config/serverConfig";
import StarIcons from "../../Home/Banner/StarIcon";

const tabItems = ["Liveaboards", "Resorts", "Special Offers"];
const ratings = [
  { minRating: 1, maxRating: 2 },
  { minRating: 1, maxRating: 3 },
  { minRating: 1, maxRating: 4 },
  { minRating: 1, maxRating: 5 },
];
const Banner = ({ setSearchResult }) => {
  const { searchValues, setSearchValues } = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [rating, setRating] = useState({ minRating: "", maxRating: "" });
  const [formattedDate, setFormattedDate] = useState("");
  const renderSelectedValue = (value) => {
    return `${value.minRating}-${value.maxRating}`;
  };

  const handleDateChange = (date) => {
    const formatted = date ? dayjs(date).format("YYYY-MM-DD") : "";

    // setSearchValues({ ...searchValues, date: formatted });
    setFormattedDate(formatted);
  };

  const handleSearchValues = () => {
    if (rating.minRating) {
      searchValues.minRating = rating?.minRating;
      searchValues.maxRating = rating?.maxRating;
    }
    if (formattedDate) {
      searchValues.date = formattedDate;
    }
    if (destination) {
      searchValues.destination = destination;
    }

    const objectToQueryString = (obj) => {
      const queryString = Object.keys(obj)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        )
        .join("&");
      return queryString;
    };

    const queryString = objectToQueryString(searchValues);

    fetch(
      `${baseUrl}/${
        searchValues?.tabValue === "Resorts" ||
        searchValues?.property === "resort"
          ? "resorts/all-resorts"
          : "boats/all-boats"
      }?${queryString}`
    )
      .then((res) => res.json())
      .then((data) => setSearchResult(data?.data));
  };

  useEffect(() => {
    setRating({
      minRating: searchValues.minRating,
      maxRating: searchValues.maxRating,
    });
  }, [searchValues]);
  return (
    <div className="bg-primary">
      <div className="w-[90%] sm:w-[85%] mx-auto py-10">
        <div>
          <div className="flex items-center gap-2 md:gap-5 mt-10">
            {tabItems?.map((item, index) => (
              <div
                onClick={() =>
                  setSearchValues({
                    ...searchValues,
                    tabValue: item,
                  })
                }
                key={index}
                className={`${
                  searchValues?.tabValue === item
                    ? "text-[#0080ff]  bg-white"
                    : "text-[#f1f2f2] bg-transparent border-2"
                } px-3 md:px-6 cursor-pointer py-2 rounded-full text-[14px] md:text-[22px] font-[400]`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:space-y-0 space-y-2 gap-3 justify-between md:items-center pb-10 text-white">
            <div
              onClick={() => setIsModalOpen(true)}
              className="w-full lg:w-[50%] relative "
            >
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="absolute left-0 top-2  h-12 w-full pe-3  flex justify-end"
                      position="start"
                    >
                      <ArrowDropDown className="text-white cursor-pointer " />
                    </InputAdornment>
                  ),
                }}
                id="outlined-basic"
                disabled={
                  searchValues?.destination === "" && destination === ""
                }
                label="Destinations"
                value={searchValues?.destination || destination}
                variant="outlined"
                fullWidth
                className="text-white"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color
                      background: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color on hover
                      background: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused
                      background: "transparent",
                    },
                    "&.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "white", // Border color when disabled
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "white", // Text color when disabled
                        backgroundColor: "transparent", // Background color when disabled
                      },
                    },
                  },
                  "& .MuiFormLabel-root.Mui-disabled": {
                    color: "white",
                  },
                  "& .MuiInputBase-input": {
                    height: "31px", // Height of the input element
                    color: "white", // Text color
                    backgroundColor: "transparent", // Ensure input background is transparent
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // Label color
                    background: "transparent",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white", // Label color when focused
                    background: "transparent",
                  },
                  "& .MuiInputBase-input::selection": {
                    color: "white",
                    background: "transparent", // Remove background color when text is selected
                  },
                  width: "100%",
                }}
              />
            </div>
            {searchValues?.tabValue === "Special Offers" ? (
              <div className="w-full lg:w-[25%]">
                <FormControl className=" w-full" style={{ color: "#f1f2f2" }}>
                  <InputLabel
                    style={{ color: "#f1f2f2" }}
                    id="demo-simple-select-label"
                  >
                    Select Property
                  </InputLabel>
                  <Select
                    className="h-12"
                    labelId="demo-simple-select-label"
                    label="Select Property"
                    id="demo-simple-select"
                    value={searchValues?.property}
                    input={<OutlinedInput label="Select Property" />}
                    onChange={(e) =>
                      setSearchValues({
                        ...searchValues,
                        property: e.target.value,
                      })
                    }
                    IconComponent={() => (
                      <ArrowDropDown className="text-white cursor-pointer" />
                    )}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },

                      color: "white",
                      ".MuiSelect-icon": {
                        color: "white",
                      },
                    }}
                  >
                    <MenuItem value={"boat"}>Boat</MenuItem>
                    <MenuItem value={"resort"}>Resort</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="relative sm:static w-full lg:w-[15%]">
                  <DatePicker
                    slots={{
                      openPickerIcon: ArrowDropDown,
                    }}
                    className="w-full"
                    onChange={handleDateChange}
                    disablePast
                    value={
                      searchValues?.date
                        ? dayjs(new Date(searchValues.date).toISOString())
                        : null
                    }
                    label={"Year / Month"}
                    views={["month", "year"]}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "lightblue", // Border color
                        },
                        "&:hover fieldset": {
                          borderColor: "white", // Border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white", // Border color when focused
                        },
                      },
                      "& .MuiInputBase-input": {
                        height: "35px", // Height of the input element
                        color: "white", // Text color
                        backgroundColor: "transparent", // Ensure input background is transparent
                      },
                      "& .MuiInputLabel-root": {
                        color: "white", // Label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white", // Label color when focused
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white", // Color of the calendar icon
                      },
                      width: "100%", // Width of the entire TextField
                    }}
                  />
                  <div className="absolute top-4 right-3 h-full text-white  ">
                    <ArrowDropDown className="text-white cursor-pointer" />
                  </div>
                </div>
              </LocalizationProvider>
            )}

            <div className="w-full lg:w-[15%]">
              <FormControl className=" w-full" style={{ color: "#f1f2f2" }}>
                <InputLabel
                  style={{ color: "#f1f2f2" }}
                  id="demo-simple-select-label"
                >
                  Vegan ratings
                </InputLabel>
                <Select
                  label="Vegan rating"
                  className="h-12"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rating}
                  renderValue={renderSelectedValue}
                  input={<OutlinedInput label="Vegan rating" />}
                  onChange={(e) => setRating(e.target.value)}
                  IconComponent={() => (
                    <ArrowDropDown className="text-white cursor-pointer" />
                  )}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },

                    color: "white",
                    ".MuiSelect-icon": {
                      color: "white",
                    },
                  }}
                >
                  {ratings.map((r) => (
                    <MenuItem
                      className=""
                      key={`${r.minRating}-${r.maxRating}`}
                      value={r}
                    >
                      <div className="flex flex-col gap-4">
                        {" "}
                        {r.minRating === 1 && r.maxRating === 2 && (
                          <div className="flex gap-0 items-center">
                            <StarIcons />
                            <StarIcons />
                          </div>
                        )}
                        {r.minRating === 1 && r.maxRating === 3 && (
                          <div className="flex gap-0 items-center">
                            <StarIcons />
                            <StarIcons />
                            <StarIcons />
                          </div>
                        )}{" "}
                        {r.minRating === 1 && r.maxRating === 4 && (
                          <div className="flex gap-0 items-center">
                            <StarIcons />
                            <StarIcons />
                            <StarIcons />
                            <StarIcons />
                          </div>
                        )}
                        {r.minRating === 1 && r.maxRating === 5 && (
                          <div className="flex gap-0 items-center">
                            <StarIcons />
                            <StarIcons />
                            <StarIcons />
                            <StarIcons />
                            <StarIcons />
                          </div>
                        )}
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-[200px] lg:w-[15%] text-center sm:ps-5">
              <div
                className={` bg-white md:px-6 lg:px-0 py-2 rounded-full text-[#00afff]  
                text-[22px] font-[400] cursor-pointer`}
                onClick={handleSearchValues}
              >
                Search
              </div>
            </div>
          </div>
          <SearchItemModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setDestination={setDestination}
            destination={destination}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
