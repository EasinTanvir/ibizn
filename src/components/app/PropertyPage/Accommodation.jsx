import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
const Accommodation = ({ propertyData, resort }) => {
  console.log(propertyData?.schedules);
  const [activeButton, setActiveButton] = useState();

  const lists = propertyData?.schedules?.flatMap((data) => {
    console.log(data?.itinerary?.cabins[0]);
    if (data?.itinerary?.cabins.length > 0) {
      return data?.itinerary?.cabins?.map((list) => ({
        id: list?._id,
        cabinName: list?.cabinName,
        cabinPicture: list?.cabinPicture,
      }));
    }
    return []; // return an empty array if no cabins
  });

  useEffect(() => {
    if (propertyData?.schedules?.length > 0) {
      setActiveButton(
        propertyData?.schedules[0]?.itinerary?.cabins[0]?.cabinPicture
      );
    }
  }, [propertyData]);

  const Button = ({ label, cabinPicture }) => (
    <button
      className={`px-4 py-1 text-sm md:text-xl  rounded-full border-2 ${
        activeButton === cabinPicture
          ? "bg-[#0080FF] text-white border-[#0080FF]"
          : "text-[#0080FF] border-[#0080FF] hover:bg-[#0080FF] hover:text-white transition-colors duration-300"
      }`}
      onClick={() => setActiveButton(cabinPicture)}
    >
      {label}
    </button>
  );

  console.log(activeButton);
  return (
    <div className="bg-[#F1F2F2]    sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px] px-4 lg:px-0">
      <section className="customContainer flex flex-col-reverse lg:flex-row    justify-center  lg:py-16  gap-[45px] lg:gap-12 ">
        <div className="w-full lg:w-1/2 aspect-[3/2] lg:aspect-[3/2] order-first lg:order-none">
          <img
            className="w-full h-full object-cover"
            src={
              activeButton
                ? activeButton
                : propertyData?.accommodation?.Picture ||
                  propertyData?.accommodation?.image
            }
            alt={activeButton}
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
          <div className=" ">
            <h1 className=" sm:text-title text-title2 -mt-2  text-primary   md:font-light  font-outfit">
              Accommodation
            </h1>
            <p className="text-[16px] md:text-subtitle font-normal sm:pt-[30px]  pt-[25px] font-roboto  text-secondary    ">
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    propertyData?.accommodation?.description
                  ),
                }}
              />
            </p>
          </div>
          {!resort && (
            <div className="flex flex-wrap gap-4 mt-[20px] lg:mt-16 text-[#2f2f30]">
              {lists?.map((button) => (
                <Button
                  key={button?.id}
                  label={button?.cabinName}
                  cabinPicture={button?.cabinPicture}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Accommodation;
