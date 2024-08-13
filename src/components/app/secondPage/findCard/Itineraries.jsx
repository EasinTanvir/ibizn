import React from "react";
import dayjs from "dayjs";
const Itineraries = ({ schedules }) => {
  return (
    <div className=" sm:pt-0 pt-[45px]">
      {schedules?.map((item, index) => (
        <div
          key={index}
          className={`flex   pb-6 px-5 md:px-5 ${
            index % 2 === 0 ? "bg-slate-100" : ""
          }`}
        >
          <div className="flex sm:flex-row flex-col sm:w-fit  w-1/2 ">
            <h1 className="text-[#0080ff] font-outfit font-light sm:pe-5 text-[16px]   leading-[20px]  lg:text-subtitle ">
              {dayjs(item?.tripStart).format("MMM DD")} -{" "}
              {dayjs(item?.tripEnd).format("MMM DD")}
            </h1>

            <h1 className="   sm:border-l-2 sm:pl-5  text-[#0080ff] font-outfit font-light sm:pe-5 text-[14px] mt-1  lg:text-subtitle">
              {item?.itinerary?.numberOfDays + " "}Days,{" "}
              {item?.itinerary?.numberOfNights + " "}Nights
            </h1>

            <h1 className="  sm:border-l-2 sm:pl-5  text-[#0080ff] font-outfit font-light text-[14px]  lg:text-subtitle">
              approx. {item?.itinerary?.numberOfDives} Up to x dives
            </h1>
          </div>

          <div className="sm:w-52  w-1/2  sm:ml-5">
            <div className="text-[#0080ff] flex sm:flex-row flex-col items-end sm:items-start font-outfit font-light  text-[14px]  lg:text-subtitle sm:border-l-2 pl-5">
              <span> From USD</span>
              <span className="text-[#0080ff] sm:ms-2   font-outfit font-light  text-[14px]  lg:text-subtitle">
                {item?.convertPrice}
              </span>
            </div>
            <div className="text-end sm:hidden">
              <button className=" bg-primary text-white rounded-full  mt-1 px-8 py-1">
                Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itineraries;
