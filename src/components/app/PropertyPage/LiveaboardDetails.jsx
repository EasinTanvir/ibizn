import React from "react";

function LiveaboardDetails({ propertyData, resort }) {
  return (
    <div className="flex flex-col gap-20 lg:flex-row bg-white pb-16   sm:mt-16 mt-10   customContainer  justify-center px-4 lg:px-0">
      <div className="flex  flex-col items-start justify-start gap-2 font-light w-full  text-[#2f2f30]">
        <h1 className="text-3xl sm:mt-14 text-[#0080FF] md:text-6xl md:font-light md:text-[#0080FF] md:mb-2 font-outfit">
          {resort ? "llike Resort" : "llike Liveaboard"}
        </h1>
        <p className=" text-secondary">
          {" "}
          {resort
            ? propertyData?.briefDescription
            : propertyData?.liveABoard?.description}
        </p>
      </div>
      <div className="w-full  md:h-auto md:pt-16">
        <img
          className="w-full  h-[350px] md:h-[500px] object-cover overflow-hidden"
          src={
            resort
              ? propertyData?.featureImage
              : propertyData?.liveABoard?.Picture
          }
          alt="Ilike Liveaboard"
        />
      </div>
    </div>
  );
}

export default LiveaboardDetails;
