import React, { useContext, useEffect, useRef, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import {
  Box,
  IconButton,
  InputAdornment,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import FacilityFilter from "./FacilityFilter";
import { userContext } from "@/src/storage/contextApi";
import DivingType from "./DivingType";
import ResortStyle from "./ResortStyle";
import { ArrowDropDown } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
const Filtering = () => {
  const [isShowPriceField, setIsShowPriceField] = useState(false);
  const { searchValues } = useContext(userContext);
  const priceFieldRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      priceFieldRef.current &&
      !priceFieldRef.current.contains(event.target)
    ) {
      setIsShowPriceField(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-gray-100">
      <div className="md:w-[85%] px-5 md:px-0 mx-auto py-[20px]">
        <div className="flex  gap-4 mt-1   flex-wrap   ">
          <div>
            <div className="relative">
              <TextField
                className="w-36"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="absolute left-0   h-12 w-full pe-3  flex justify-end"
                      position="start"
                    >
                      <ArrowDropDown className="text-[#0080ff] cursor-pointer " />
                    </InputAdornment>
                  ),
                }}
                id="outlined-basic"
                label="Price Range"
                variant="outlined"
                size="small"
                fullWidth
                onClick={() => setIsShowPriceField(true)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#0080ff", // Border color
                      background: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#0080ff", // Border color on hover
                      background: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0080ff", // Border color when focused
                      background: "transparent",
                    },
                  },

                  "& .MuiInputBase-input": {
                    height: "24px", // Height of the input element
                    color: "#0080ff", // Text color
                    backgroundColor: "transparent", // Ensure input background is transparent
                  },
                  "& .MuiInputLabel-root": {
                    color: "#0080ff", // Label color
                    background: "transparent",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0080ff", // Label color when focused
                    background: "transparent",
                  },
                  "& .MuiInputBase-input::selection": {
                    color: "#0080ff",
                    background: "transparent", // Remove background color when text is selected
                  },
                }}
              />
              {isShowPriceField && (
                <div
                  ref={priceFieldRef}
                  className="w-full md:w-[760] h-56 rounded-md shadow-md absolute z-30 bg-white px-2"
                >
                  {" "}
                  <input
                    type="text"
                    placeholder="Min Price"
                    className="input input-bordered w-full max-w-xs mt-3"
                  />
                  <input
                    type="text"
                    placeholder="Max Price"
                    className="input input-bordered w-full max-w-xs mt-3"
                  />
                  <button
                    onClick={() => setIsShowPriceField(false)}
                    className="bg-[#0080ff] text-white rounded-md  my-3 py-2 w-full"
                  >
                    Search
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            {searchValues?.tabValue !== "Resorts" &&
              searchValues?.property !== "resort" && (
                <div>
                  <TextField
                    className="w-32"
                    onClick={handleClick}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          className="absolute left-0 h-12 w-full pe-3 flex justify-end"
                          position="start"
                        >
                          <IconButton>
                            <ArrowDropDown className="text-[#0080ff] cursor-pointer" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    id="outlined-basic"
                    label="Duration"
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0080ff", // Border color
                          background: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "#0080ff", // Border color on hover
                          background: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0080ff", // Border color when focused
                          background: "transparent",
                        },
                      },
                      "& .MuiInputBase-input": {
                        height: "24px", // Height of the input element
                        color: "#0080ff", // Text color
                        backgroundColor: "transparent", // Ensure input background is transparent
                      },
                      "& .MuiInputLabel-root": {
                        color: "#0080ff", // Label color
                        background: "transparent",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#0080ff", // Label color when focused
                        background: "transparent",
                      },
                      "& .MuiInputBase-input::selection": {
                        color: "#0080ff",
                        background: "transparent", // Remove background color when text is selected
                      },
                    }}
                  />

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Box sx={{ width: 200 }}>
                        <Typography>Number Of Nights</Typography>
                        <Slider
                          defaultValue={2}
                          max={50}
                          aria-label="Default"
                          valueLabelDisplay="auto"
                        />
                      </Box>
                    </MenuItem>
                  </Menu>
                </div>
              )}
          </div>
          <div>
            <FacilityFilter />
          </div>
          {searchValues?.tabValue === "Resorts" ||
          searchValues?.property === "resort" ? (
            <div>
              <DivingType />
            </div>
          ) : (
            <div>
              <TextField
                className="w-32"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="absolute left-0   h-12 w-full pe-3  flex justify-end"
                      position="start"
                    >
                      <ArrowDropDown className="text-[#0080ff] cursor-pointer " />
                    </InputAdornment>
                  ),
                }}
                id="outlined-basic"
                label="Capacity "
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#0080ff", // Border color
                      background: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#0080ff", // Border color on hover
                      background: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0080ff", // Border color when focused
                      background: "transparent",
                    },
                  },

                  "& .MuiInputBase-input": {
                    height: "24px", // Height of the input element
                    color: "#0080ff", // Text color
                    backgroundColor: "transparent", // Ensure input background is transparent
                  },
                  "& .MuiInputLabel-root": {
                    color: "#0080ff", // Label color
                    background: "transparent",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0080ff", // Label color when focused
                    background: "transparent",
                  },
                  "& .MuiInputBase-input::selection": {
                    color: "#0080ff",
                    background: "transparent", // Remove background color when text is selected
                  },
                }}
              />
            </div>
          )}
          {searchValues?.tabValue === "Resorts" ||
          searchValues?.property === "resort" ? (
            <div>
              <ResortStyle />
            </div>
          ) : (
            <div>
              <TextField
                className="w-32"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="absolute left-0 h-12 w-full pe-3 flex justify-end"
                      position="start"
                    >
                      <ArrowDropDown className="text-[#0080ff] cursor-pointer" />
                    </InputAdornment>
                  ),
                }}
                id="outlined-basic"
                label="Charter"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#0080ff", // Border color
                      background: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#0080ff", // Border color on hover
                      background: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0080ff", // Border color when focused
                      background: "transparent",
                    },
                  },

                  "& .MuiInputBase-input": {
                    height: "24px", // Height of the input element
                    color: "#0080ff", // Text color
                    backgroundColor: "transparent", // Ensure input background is transparent
                  },
                  "& .MuiInputLabel-root": {
                    color: "#0080ff", // Label color
                    background: "transparent",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0080ff", // Label color when focused
                    background: "transparent",
                  },
                  "& .MuiInputBase-input::selection": {
                    color: "#0080ff",
                    background: "transparent", // Remove background color when text is selected
                  },
                }}
              />
            </div>
          )}
          {searchValues?.tabValue !== "Resorts" &&
            searchValues?.property !== "resort" && (
              <div>
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        className="absolute left-0   h-12 w-full pe-3  flex justify-end"
                        position="start"
                      >
                        <ArrowDropDown className="text-[#0080ff] cursor-pointer " />
                      </InputAdornment>
                    ),
                  }}
                  className="w-40"
                  id="outlined-basic"
                  label=" Departure Port"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#0080ff", // Border color
                        background: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0080ff", // Border color on hover
                        background: "transparent",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0080ff", // Border color when focused
                        background: "transparent",
                      },
                    },

                    "& .MuiInputBase-input": {
                      height: "24px", // Height of the input element
                      color: "#0080ff", // Text color
                      backgroundColor: "transparent", // Ensure input background is transparent
                    },
                    "& .MuiInputLabel-root": {
                      color: "#0080ff", // Label color
                      background: "transparent",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0080ff", // Label color when focused
                      background: "transparent",
                    },
                    "& .MuiInputBase-input::selection": {
                      color: "#0080ff",
                      background: "transparent", // Remove background color when text is selected
                    },
                  }}
                />
              </div>
            )}

          <div className="sm:ps-14">
            <button className="bg-primary text-white rounded-2xl sm:px-12 px-8 py-2 flex sm:justify-between justify-around  sm:w-44 w-40">
              <span className="">Sort by</span>
              <span className="-me-2">
                <ImportExportIcon
                  sx={{
                    color: "white",
                    strokeWidth: 0.5,
                  }}
                  className="text-white "
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtering;
