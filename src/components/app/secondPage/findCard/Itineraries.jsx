import React from "react";

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
            <h1 className="text-[#0080ff] sm:pe-5 text-[14px] md:text-[18px] lg:text-subtitle font-outfit font-[500] sm:font-light">
              {new Date(item?.tripStart).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
              -{" "}
              {new Date(item?.tripEnd).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </h1>

            <h1 className="text-[#0080ff] sm:pe-5 text-[14px] md:text-[18px] lg:text-subtitle font-outfit sm:border-l-2 sm:pl-5 font-[500] sm:font-light">
              {item?.itinerary?.numberOfDays + " "}days,{" "}
              {item?.itinerary?.numberOfNights + " "}nights
            </h1>

            <h1 className="text-[#0080ff] text-[14px] md:text-[18px] lg:text-subtitle font-outfit sm:border-l-2 sm:pl-5 font-[500] sm:font-light">
              approx. {item?.itinerary?.numberOfDives} dives
            </h1>
          </div>

          <div className="sm:w-52  w-1/2  sm:ml-5">
            <h1 className="text-[#0080ff] text-[14px] md:text-[18px] lg:text-subtitle font-outfit sm:border-l-2 pl-5">
              from usd{" "}
              <span className="text-[#0080ff] ms-2 text-[22px]  font-outfit">
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
