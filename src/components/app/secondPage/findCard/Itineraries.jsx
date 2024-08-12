import React from "react";
import dayjs from "dayjs";
const Itineraries = ({ schedules }) => {
  return (
    <div className="">
      {schedules?.map((item, index) => (
        <div
          key={index}
          className={`flex  py-4 px-5 md:px-5 ${
            index % 2 === 0 ? "bg-slate-100" : ""
          }`}
        >
          <div className="flex sm:flex-row flex-col sm:w-fit  w-1/2 ">
            <h1 className="text-[#0080ff] font-outfit font-light sm:pe-5 text-[14px]  lg:text-subtitle ">
              {dayjs(item?.tripStart).format("MMM DD")} -{" "}
              {dayjs(item?.tripEnd).format("MMM DD")}
            </h1>

            <h1 className="   sm:border-l-2 sm:pl-5  text-[#0080ff] font-outfit font-light sm:pe-5 text-[14px]  lg:text-subtitle">
              {item?.itinerary?.numberOfDays + " "}Days,{" "}
              {item?.itinerary?.numberOfNights + " "}Nights
            </h1>

            <h1 className="  sm:border-l-2 sm:pl-5  text-[#0080ff] font-outfit font-light text-[14px]  lg:text-subtitle">
              approx. {item?.itinerary?.numberOfDives} Up to x dives
            </h1>
          </div>

          <div className="sm:w-52  w-1/2  sm:ml-5">
            <h1 className="text-[#0080ff] font-outfit font-light  text-[14px]  lg:text-subtitle sm:border-l-2 pl-5">
              From USD{" "}
              <span className="text-[#0080ff] ms-2   font-outfit font-light  text-[14px]  lg:text-subtitle">
                {item?.convertPrice}
              </span>
            </h1>
            <div className="text-center sm:hidden">
              <button className=" bg-primary text-white rounded-xl  mt-2 px-8 py-1">
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
