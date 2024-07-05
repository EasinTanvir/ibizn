import React, { useContext, useEffect, useState } from "react";
import CabinModal from "./CabinModal";
import BookingModal from "./BookingModal";
import axios from "axios";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { ArrowDropDown } from "@mui/icons-material";
import { userContext } from "@/src/storage/contextApi";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
function ItinerariesAndPrices({ propertyData }) {
  const { searchValues, setSearchValues } = useContext(userContext);
  console.log(searchValues.tripStart);

  //year
  const [selectedYear, setSelectedYear] = useState(null);
  console.log(selectedYear);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredTrips, setFilteredTrips] = useState(propertyData?.schedules);
  console.log(selectedYear);
  console.log(selectedMonth);

  //month

  const [cabins, setCabins] = useState([]);
  const [convertedAmounts, setConvertedAmounts] = useState({});

  const [conPrice, setConPrice] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = (cabins) => {
    setOpen(true);
    setCabins(cabins);
  };
  // for booking model;
  const [schedule, setSchedule] = useState({});
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const handleOpenBookingModal = (schedule) => {
    setSchedule(schedule);
    setIsOpenBookingModal(true);
  };

  if (!propertyData || !propertyData.schedules) {
    return <div>No itinerary data available</div>;
  }

  const handleMonthChange = (newValue) => {
    const formattedMonth = dayjs(newValue).format("YYYY-MM-DD");
    setSelectedMonth(formattedMonth);
    console.log(formattedMonth);
    filterTripsByMonth(newValue);
  };

  const handleYearChange = (newValue) => {
    const formattedYear = dayjs(newValue).format("YYYY-MM-DD");
    console.log(formattedYear);
    setSelectedYear(formattedYear);
    filterTripsByYear(newValue);
  };

  useEffect(() => {
    if (searchValues?.tripStart) {
      console.log(searchValues?.tripStart);
      const defaultYear = dayjs(searchValues?.tripStart).format("YYYY-MM-DD");
      const defaultMonth = dayjs(searchValues?.tripStart).format("YYYY-MM-DD");
      console.log(defaultYear);

      if (defaultYear) {
        setSelectedYear(dayjs(defaultYear));
        filterTripsByYear(defaultYear);
      }

      if (defaultMonth) {
        setSelectedMonth(dayjs(defaultMonth));
        filterTripsByMonth(defaultMonth);
      }
    }
  }, [searchValues]);

  const filterTripsByMonth = (month) => {
    const startOfMonth = dayjs(month).startOf("month");
    const endOfMonth = dayjs(month).endOf("month");
    const filtered = propertyData?.schedules.filter((trip) => {
      const tripStart = dayjs(trip.tripStart);
      const tripEnd = dayjs(trip.tripEnd);
      return tripStart?.isBefore(endOfMonth) && tripEnd?.isAfter(startOfMonth);
    });

    setFilteredTrips(filtered);
  };
  const filterTripsByYear = (year) => {
    const startOfYear = dayjs(year).startOf("year");
    const endOfYear = dayjs(year).endOf("year");
    const filtered = propertyData?.schedules.filter((trip) => {
      const tripStart = dayjs(trip.tripStart);
      const tripEnd = dayjs(trip.tripEnd);
      return tripStart?.isBefore(endOfYear) && tripEnd?.isAfter(startOfYear);
    });

    setFilteredTrips(filtered);
  };

  //console.log(propertyData?.schedules);
  return (
    <div className="w-full bg-primary">
      <div className="customContainer mx-auto py-8 px-4">
        <h1 className="text-2xl text-white font-[400] md:text-6xl md:font-light mt-8 mb-5">
          Itineraries and Prices
        </h1>
        <React.Fragment>
          <div className="pt-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className=" mb-11 flex items-center gap-4">
                <div className="relative">
                  <DatePicker
                    slots={{
                      openPickerIcon: ArrowDropDown,
                    }}
                    views={["month"]}
                    label="Month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="sm:w-40 w-28"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputBase-input": {
                        height: "35px",
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
                    }}
                  />
                  <div className="absolute sm:hidden top-4 right-3 h-full text-white  ">
                    <ArrowDropDown className="text-white cursor-pointer" />
                  </div>
                </div>
                <div className="relative">
                  <DatePicker
                    slots={{
                      openPickerIcon: ArrowDropDown,
                    }}
                    views={["year"]}
                    label="Year"
                    className=" sm:w-48 w-36"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
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
                    }}
                    value={selectedYear}
                    onChange={handleYearChange}
                  />
                  <div className="absolute sm:hidden top-4 right-3 h-full text-white  ">
                    <ArrowDropDown className="text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </LocalizationProvider>
          </div>
        </React.Fragment>

        {filteredTrips?.length > 0 ? (
          filteredTrips?.map((schedule, index) => {
            return (
              <div
                key={index}
                className="border-2 flex flex-col xl:flex-row gap-4 border-[#09aafe] text-white px-6 py-5 mb-4 rounded-lg md:justify-between items-start"
              >
                <div className="w-full">
                  <div className="md:text-white md:text-4xl items-end font-[400] flex flex-wrap  md:gap-4">
                    <div className="inline-block text-xl md:text-xl lg:text-2xl">
                      {new Date(schedule?.tripStart).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}{" "}
                      —{" "}
                      {new Date(schedule?.tripEnd).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="inline-block text-xl sm:font-light sm:text-light text-[#09aafe]  font-bold">
                      ({schedule?.itinerary?.numberOfDays} Days /{" "}
                      {schedule?.itinerary?.numberOfNights} Nights)
                    </div>
                    <span className="inline-block text-[#09aafe] text-xl font-bold sm:mt-0 mt-4 -mb-3 sm:mb-0">
                      (from <>${Number(schedule?.convertPrice).toFixed(2)}</>{" "}
                      USD)
                    </span>
                  </div>
                  <div className="sm:mt-4 mt-2">
                    <span className="text-2xl md:text-4xl md:font-light">
                      {schedule?.itinerary?.embarkationPoints} —{" "}
                      {schedule?.itinerary?.disembarkationPoints}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 sm:pt-7 ">
                  <button
                    onClick={() => handleOpen(schedule?.itinerary?.cabins)}
                    className="bg-primary border border-white text-white px-10 rounded-full  py-1 text-sm md:text-xl lg:text-2xl"
                  >
                    Itinerary
                  </button>
                  <button
                    onClick={() => handleOpenBookingModal(schedule)}
                    className="bg-white text-primary rounded-full px-10 py-1 md:px-10 text-sm md:text-xl lg:text-2xl"
                  >
                    Select
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-2xl my-2 font-semibold">
            Opps! No itineraries available.
          </p>
        )}
      </div>
      <CabinModal
        cabins={cabins}
        shedules={propertyData?.schedules}
        setOpen={setOpen}
        open={open}
      />
      <BookingModal
        open={isOpenBookingModal}
        setOpen={setIsOpenBookingModal}
        propertyData={propertyData}
        schedule={schedule}
      />
    </div>
  );
}

export default ItinerariesAndPrices;
