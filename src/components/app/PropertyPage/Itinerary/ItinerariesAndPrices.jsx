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

  //year
  const [selectedYear, setSelectedYear] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredTrips, setFilteredTrips] = useState(propertyData?.schedules);

  //month

  const [cabins, setCabins] = useState([]);

  const [modalItinary, setModalItinary] = useState();

  const [convertedAmounts, setConvertedAmounts] = useState({});

  const [conPrice, setConPrice] = useState();

  const [open, setOpen] = useState(false);

  const [tripDate, setTripDate] = useState({});
  // for booking model;
  const [schedule, setSchedule] = useState({});
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);

  const [selectItitany, setSelectItinary] = useState();
  const [selectedcabin, setSelectedCabin] = useState([]);
  const [cabinId, setCabinId] = useState();
  const [cabinPrice, setCabinPrice] = useState();
  const [discount, setDiscount] = useState();
  const [discountPrice, setDiscountPrice] = React.useState();

  const handleOpenBookingModal = (schedule, cId, price) => {
    setSchedule(schedule);
    setCabinId(cId);
    setCabinPrice(price);
    setIsOpenBookingModal(true);
  };

  React.useEffect(() => {
    if (discount) {
      const myPrice = Math.round(
        Number(schedule?.convertPrice) -
          (Number(schedule?.convertPrice) * Number(discount)) / 100
      );
      setDiscountPrice(myPrice);
    } else {
      setDiscountPrice(Number(schedule?.convertPrice));
    }
  }, [selectItitany, discount, cabinId]);

  useEffect(() => {
    if (selectItitany) {
      const filterResult = propertyData?.schedules.find(
        (data) => data._id === selectItitany
      );

      if (filterResult?.discount?.percent !== null) {
        console.log(filterResult?.discount?.percent);
        setDiscount(filterResult?.discount?.percent);
      } else {
        console.log(filterResult?.discount?.percent);
        setDiscount(0);
      }

      console.log(filterResult?.itinerary?.cabins);

      setSelectedCabin(filterResult?.itinerary?.cabins);
    }
  }, [selectItitany]);

  const handleOpen = (cabins, itinary, tripStart, tripEnd) => {
    setTripDate({ tripStart, tripEnd });
    setOpen(true);
    setModalItinary(itinary);
    setCabins(cabins);
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
    <div className="w-full bg-primary sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px]">
      <div className="customContainer mx-auto px-4">
        <h1 className="sm:text-title  text-title2 text-white  font-light font-outfit ">
          Itineraries and Prices
        </h1>
        <React.Fragment>
          <div className="mt-[30px]">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="  flex items-center gap-4">
                <div className="relative">
                  <DatePicker
                    slots={{
                      openPickerIcon: ArrowDropDown,
                    }}
                    views={["month"]}
                    label="Month"
                    format="MMM YYYY"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="sm:w-40 w-36"
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
                    className=" sm:w-40 w-36"
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

        <div className="mt-[43px]">
          {filteredTrips?.length > 0 ? (
            filteredTrips?.map((schedule, index) => {
              console.log(schedule?._id);
              return (
                <div>
                  <div
                    key={index}
                    className={`border-2 flex flex-col xl:flex-row gap-4 mt-2 ${
                      schedule._id === selectItitany ? "bg-white" : ""
                    }  border-[#09aafe] text-white px-6 py-5  rounded-lg md:justify-between items-start`}
                  >
                    <div className="w-full">
                      <div
                        className={` ${
                          schedule._id === selectItitany
                            ? "text-primary"
                            : "text-white"
                        } items-center  flex flex-wrap  md:gap-4`}
                      >
                        <div className="inline-block  sm:text-2xl text-[20px] font-roboto font-light leading-[22px] mb-1">
                          {new Date(schedule?.tripStart).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}{" "}
                          —{" "}
                          {new Date(schedule?.tripEnd).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div
                          className={`inline-block font-roboto font-bold leading-[22px] text-[20px]  ${
                            schedule._id === selectItitany
                              ? "text-primary"
                              : "text-[#09aafe]"
                          }   font-bold`}
                        >
                          ({schedule?.itinerary?.numberOfDays} Days /{" "}
                          {schedule?.itinerary?.numberOfNights} Nights)
                        </div>
                        <span
                          className={`inline-block ${
                            schedule._id === selectItitany
                              ? "text-primary"
                              : "text-[#09aafe]"
                          }  font-roboto  leading-[22px] text-[20px]  font-bold sm:mt-0 mt-4 -mb-3 sm:mb-0`}
                        >
                          (from{" "}
                          <>${Number(schedule?.convertPrice).toFixed(2)}</> USD)
                        </span>
                      </div>
                      <div className="mt-4">
                        <span
                          className={`text-[24px] leading-[24px] md:text-[36px] font-light  font-outfit ${
                            schedule._id === selectItitany
                              ? "text-primary"
                              : "text-light"
                          }`}
                        >
                          {schedule?.itinerary?.itineraryName}
                        </span>
                        {"   "}
                        <span
                          className={`text-[24px] leading-[24px] md:text-[36px] font-light  font-outfit ${
                            schedule._id === selectItitany
                              ? "text-primary"
                              : "text-light"
                          }`}
                        >
                          ({schedule?.itinerary?.embarkationPoints} —{" "}
                          {schedule?.itinerary?.disembarkationPoints})
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 sm:pt-10 ">
                      <button
                        onClick={() =>
                          handleOpen(
                            schedule?.itinerary?.cabins,
                            schedule?.itinerary,
                            schedule?.tripStart,
                            schedule?.tripEnd
                          )
                        }
                        className={` border  ${
                          schedule._id === selectItitany
                            ? "text-primary border-primary"
                            : "text-light border-white"
                        } px-10 rounded-full  py-1 text-sm md:text-xl lg:text-2xl`}
                      >
                        Itinerary
                      </button>
                      {/* <button
                    onClick={() => handleOpenBookingModal(schedule)}
                    className="bg-white text-primary rounded-full px-10 py-1 md:px-10 text-sm md:text-xl lg:text-2xl"
                  >
                    Select
                  </button> */}
                      <button
                        onClick={() => setSelectItinary(schedule._id)}
                        className={`${
                          schedule._id === selectItitany
                            ? "text-white border-none bg-primary"
                            : "text-primary border-none bg-white"
                        } rounded-full px-10 py-1 md:px-10 text-sm md:text-xl lg:text-2xl `}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                  {selectItitany === schedule._id &&
                    selectedcabin.length > 0 && (
                      <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mb-5 gap-3">
                        {selectedcabin.map((data) => (
                          <div className="border border-white py-4 px-6 rounded-md  ">
                            <h1 className="text-xl text-white font-medium  ">
                              {data?.cabinName}
                            </h1>

                            <>
                              {discount ? (
                                <>
                                  <div className="mt-2">
                                    <span className="text-[#3a95ea] text-2xl md:text-3xl line-through">
                                      {data?.convertedPrice}
                                    </span>
                                    <span className="inline-block text-[#3a95ea] ms-1 line-through font-semibold text-sm">
                                      USD
                                    </span>
                                  </div>
                                  <div className=" mt-2">
                                    <span className="text-white text-2xl md:text-3xl ">
                                      {Math.round(
                                        Number(data?.convertedPrice) -
                                          (Number(data?.convertedPrice) *
                                            Number(discount)) /
                                            100
                                      )}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <div className="mt-2">
                                    <span className="text-white text-2xl md:text-3xl ">
                                      {data?.convertedPrice}
                                    </span>
                                    <span className="inline-block text-white ms-1  font-semibold text-sm">
                                      USD
                                    </span>
                                  </div>
                                </>
                              )}
                            </>

                            {console.log(data)}

                            <div className="pt-5">
                              <button
                                onClick={() => {
                                  const price = discount
                                    ? Math.round(
                                        Number(data?.convertedPrice) -
                                          (Number(data?.convertedPrice) *
                                            Number(discount)) /
                                            100
                                      )
                                    : Number(data?.convertedPrice);

                                  return handleOpenBookingModal(
                                    schedule,
                                    data?._id,
                                    price
                                  );
                                }}
                                className="bg-white text-primary rounded-full px-6 py-1 text-sm lg:text-xl "
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        ))}

                        <span></span>
                      </div>
                    )}
                </div>
              );
            })
          ) : (
            <p className="text-2xl my-2 font-semibold">
              Opps! No itineraries available.
            </p>
          )}
        </div>
      </div>
      <CabinModal
        tripDate={tripDate}
        cabins={cabins}
        ititnary={modalItinary}
        setOpen={setOpen}
        open={open}
      />
      <BookingModal
        open={isOpenBookingModal}
        setOpen={setIsOpenBookingModal}
        propertyData={propertyData}
        schedule={schedule}
        cabinId={cabinId}
        discountPrice={discountPrice}
        discount={discount}
        cabinPrice={cabinPrice}
      />
    </div>
  );
}

export default ItinerariesAndPrices;
