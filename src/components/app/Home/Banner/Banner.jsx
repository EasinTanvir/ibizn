import React, { useContext, useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchItemModal from "./SearchItemModal";
import dayjs from "dayjs";
import { Button, InputAdornment, Typography } from "@mui/material";
import { userContext } from "@/src/storage/contextApi";
import { useRouter } from "next/router";

import StarIcons from "./StarIcon";
import toast from "react-hot-toast";

const tabItems = ["Liveaboards", "Resorts", "Special Offers"];
const ratings = [
  { minRating: 1, maxRating: 5 },
  { minRating: 2, maxRating: 5 },
  { minRating: 3, maxRating: 5 },
  { minRating: 4, maxRating: 5 },
];
const Banner = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { searchValues, setSearchValues } = useContext(userContext);
  // const [tabValue, setTabValue] = useState("Liveaboards");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [destination, setDestination] = useState("");
  const [rating, setRating] = useState({ minRating: "", maxRating: "" });
  const [formattedDate, setFormattedDate] = useState("");
  // const [property, setProperty] = useState("");
  const renderSelectedValue = (value) => {
    return `${value.minRating}-${value.maxRating}`;
  };

  const handleDateChange = (date) => {
    if (date) {
      const startOfMonth = dayjs(date).startOf("month").format("YYYY-MM-DD");
      const endOfMonth = dayjs(date).endOf("month").format("YYYY-MM-DD");
      console.log(startOfMonth);
      console.log(endOfMonth);
      setSearchValues({
        ...searchValues,
        tripStart: startOfMonth,
        tripEnd: endOfMonth,
      });
    }
  };

  const handleSearchValues = () => {
    if (rating?.minRating) {
      searchValues.minRating = rating?.minRating;
      searchValues.maxRating = rating?.maxRating;
    }

    console.log(searchValues.tabValue);
    if (searchValues.tabValue === "Special Offers") {
      if (searchValues.property === "" || searchValues.destination === "") {
        toast.error("Please select Destination and Property");
      } else {
        router.push("/secondPage");
      }
    } else {
      if (
        searchValues.destination === "" ||
        searchValues.tripStart === "" ||
        searchValues.tripEnd === ""
      ) {
        toast.error("Please select Destination and Date");
      } else {
        router.push("/secondPage");
      }
    }
  };

  return (
    <div className="bg-primary  sm:py-[90px] pt-[45px] pb-[90px] ">
      <div className=" customContainer px-5 xl:px-0 ">
        <div className="lg:flex justify-between ">
          <div className="md:flex flex-col  gap-14 ">
            <div>
              <h1 className="md:text-title md:w-[650px] w-[72%]  text-[40px]  leading-[40px] text-white font-light font-outfit ">
                Inclusive dive adventures start here
              </h1>
              <h2 className="text-[22px] font-roboto font-[400]   mt-[25px] md:mt-3  text-white tracking-wide ">
                Book your diving trip online
              </h2>
            </div>
            {/* test */}
            <div className="flex items-center justify-between gap-2 md:gap-5 mt-[35px] sm:mt-0 ">
              {tabItems?.map((item, index) => (
                <div
                  onClick={() =>
                    setSearchValues({
                      ...searchValues,
                      tabValue: item,
                      property: "",
                    })
                  }
                  key={index}
                  className={`${
                    searchValues?.tabValue === item
                      ? "text-[#0080ff]  bg-white"
                      : "text-[#f1f2f2] bg-transparent border"
                  } text-center ${
                    index === 1 ? "w-fit px-4 sm:px-8" : "flex-1"
                  }  cursor-pointer py-2 font-roboto font-normal rounded-full text-[14px] md:text-[20px]  hover:bg-white hover:text-primary`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="md:mt-10 xl:block hidden lg:mt-0 mt-[25px]  md:pe-10">
            <img className="h-64" src="/images/client/bannerImage.png" alt="" />
          </div>
        </div>

        <div className="sm:mt-6 mt-6  flex flex-col md:flex-row md:space-y-0 space-y-2 gap-3 justify-between md:items-center  text-white">
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
              disabled={searchValues?.destination === ""}
              label="Destinations"
              value={searchValues?.destination}
              variant="outlined"
              fullWidth
              className="text-white "
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
                  marginTop: "-4px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white", // Label color when focused
                  background: "transparent",
                },
                "& .MuiInputBase-input::selection": {
                  color: "white",
                  marginTop: "0px",
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
                  label="Select Property"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchValues?.property}
                  input={<OutlinedInput label="Select Property" />}
                  onChange={(e) =>
                    setSearchValues({
                      ...searchValues,
                      property: e.target.value,
                      date: "",
                    })
                  }
                  IconComponent={() => (
                    <ArrowDropDown className="text-white cursor-pointer mr-3" />
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
              <div className="relative  sm:static w-full lg:w-[15%]">
                <DatePicker
                  slots={{
                    openPickerIcon: ArrowDropDown,
                  }}
                  className="w-full  "
                  onChange={handleDateChange}
                  format="MMM YYYY"
                  label={"Year / Month"}
                  views={["month", "year"]}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "lightblue",
                      },

                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputBase-input": {
                      height: "33px",
                      color: "white",
                      backgroundColor: "transparent",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                    width: "100%",
                  }}
                />
                <div className="absolute sm:hidden top-4 right-3 h-full text-white  ">
                  <ArrowDropDown className="text-white cursor-pointer" />
                </div>
              </div>
            </LocalizationProvider>
          )}

          <div className="w-full lg:w-[15%]">
            <FormControl className=" " fullWidth style={{ color: "#f1f2f2" }}>
              <InputLabel
                style={{ color: "#f1f2f2" }}
                id="demo-simple-select-label"
                className="-mt-1"
              >
                Vegan ratings
              </InputLabel>
              {console.log(rating)}
              <Select
                className="h-12 "
                label="Vegan rating"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={
                  rating.minRating === "" || rating.maxRating === ""
                    ? null
                    : rating
                }
                renderValue={renderSelectedValue}
                input={<OutlinedInput label="Vegan rating" />}
                onChange={(e) => setRating(e.target.value)}
                IconComponent={ArrowDropDown}
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
                {console.log(rating)}
                {ratings.map((r) => (
                  <MenuItem
                    className=""
                    key={`${r.minRating}-${r.maxRating}`}
                    value={r}
                  >
                    <div className="flex flex-col gap-4">
                      {" "}
                      {r.minRating === 1 && r.maxRating === 5 && (
                        <div className="flex gap-0 items-center">
                          <StarIcons />
                        </div>
                      )}
                      {r.minRating === 2 && r.maxRating === 5 && (
                        <div className="flex gap-0 items-center">
                          <StarIcons />
                          <StarIcons />
                        </div>
                      )}{" "}
                      {r.minRating === 3 && r.maxRating === 5 && (
                        <div className="flex gap-0 items-center">
                          <StarIcons />
                          <StarIcons />
                          <StarIcons />
                        </div>
                      )}
                      {r.minRating === 4 && r.maxRating === 5 && (
                        <div className="flex gap-0 items-center">
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
          <div className="w-[200px] lg:w-[25%] text-center sm:ps-8 ">
            <div
              className={` bg-white w-40 md:px-6 lg:px-0 py-2 rounded-full text-[#0080ff]  
                text-[22px] font-[400] cursor-pointer mt-[30px] md:mt-0`}
              onClick={handleSearchValues}
            >
              Search
            </div>
          </div>
        </div>
        <SearchItemModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
};

export default Banner;
