import React from "react";

function LiveaboardDetails({ propertyData, resort }) {
  return (
    <div className="flex flex-col gap-20 lg:flex-row bg-white pb-16   sm:mt-16 mt-10   customContainer  justify-center px-4 lg:px-0">
      <div className="flex  flex-col items-start justify-start gap-2 font-light w-full  text-[#2f2f30]">
        <h1 className="text-3xl sm:mt-14 text-[#0080FF] md:text-6xl md:font-light md:text-[#0080FF] md:mb-2 font-outfit">
          {resort ? (
            <span>The Resort</span>
          ) : (
            <span>
              {/* {propertyData?.nameOfProperty || propertyData?.propertyName}{" "} */}
              The Liveaboard
            </span>
          )}
        </h1>
        <p className=" text-secondary">
          {" "}
          {resort
            ? propertyData?.briefDescription
            : propertyData?.liveABoard?.description}
        </p>
      </div>
      <div className="w-full aspect-[2/3] md:aspect-[2/3]">
        <img
          className="w-full h-full object-cover"
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
