import React from "react";
import DOMPurify from "dompurify";

function LiveaboardDetails({ propertyData, resort }) {
  return (
    <div className="flex   flex-col lg:gap-20 gap-0 lg:flex-row bg-white  sm:pb-[120px] pb-[90px]  sm:pt-[90px] pt-[75px]    customContainer  justify-center px-4 lg:px-0">
      <div className="flex   flex-col items-start justify-start  sm:gap-2 gap-0 font-light w-full  text-[#2f2f30]">
        <h1 className="  text-primary sm:text-title  text-title2 font-light    font-outfit">
          {resort ? (
            <span>The Resort</span>
          ) : (
            <span>
              {/* {propertyData?.nameOfProperty || propertyData?.propertyName}{" "} */}
              The Liveaboard
            </span>
          )}
        </h1>
        <p className="text-secondary sm:text-subtitle text-subtitle3 font-roboto font-light sm:mt-[30px] mt-[25px]">
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                resort
                  ? propertyData?.briefDescription
                  : propertyData?.liveABoard?.description
              ),
            }}
          />
        </p>
      </div>
      <div className="w-full  sm:mt-0 mt-[45px] aspect-[3/2] md:aspect-[3/2]">
        <img
          className="w-full h-full object-cover mt-1"
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
